import React, { useState, useRef, useEffect,useMemo } from "react";
import ClaimFormImg from "../../../assets/Vector.svg";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { sendClaimFormEmail } from "../../../utils/emailService";
import { motion } from "framer-motion";
import { Button, CircularProgress, Grid, Paper } from "@mui/material";

// Custom CAPTCHA Component
const CustomCaptcha = ({ onCaptchaChange, resetTrigger }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [charOffsets, setCharOffsets] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const generateCaptcha = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let offsets = [];
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
      offsets.push((Math.random() * 10 - 5).toFixed(2));
    }
    setCaptchaText(result);
    setCharOffsets(offsets);
    setUserInput('');
    setIsValid(false);
    onCaptchaChange && onCaptchaChange(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (resetTrigger) {
      generateCaptcha();
    }
  }, [resetTrigger]);

  useEffect(() => {
    const timer = setInterval(() => {
      generateCaptcha();
    }, 60000);

    return () => {
      clearInterval(timer);
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]);

  const speakCaptcha = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);

      const voices = window.speechSynthesis.getVoices();
      const maleUsVoice = voices.find(voice =>
        voice.lang === 'en-US' &&
        voice.name.toLowerCase().includes('david')
      ) || voices.find(voice =>
        voice.lang === 'en-US'
      );

      let currentIndex = 0;
      const speakNextChar = () => {
        if (currentIndex < captchaText.length) {
          const char = captchaText[currentIndex];
          const utterance = new SpeechSynthesisUtterance(char);
          utterance.rate = 0.5;
          utterance.pitch = 0.9;
          utterance.volume = 1.0;
          utterance.lang = 'en-US';

          if (maleUsVoice) {
            utterance.voice = maleUsVoice;
          }

          utterance.onend = () => {
            currentIndex++;
            speakNextChar();
          };

          window.speechSynthesis.speak(utterance);
        } else {
          setIsSpeaking(false);
        }
      };

      speakNextChar();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    const valid = value === captchaText;
    setIsValid(valid);
    onCaptchaChange && onCaptchaChange(valid);
  };

  const handleAudioToggle = (e) => {
    setAudioEnabled(e.target.checked);
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="bg-gray-100 p-3 rounded font-mono text-lg tracking-wider select-none relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #ccc, #ccc 1px, transparent 1px, transparent 5px)`,
              backgroundSize: '100% 10px',
              backgroundPosition: '0 50%'
            }}
          />
          <div className="relative z-10">
            {captchaText.split('').map((char, index) => (
              <span
                key={index}
                style={{
                  transform: `translateY(${parseFloat(charOffsets[index] || 0)}px)`,
                  display: 'inline-block',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
                className="mx-0.5"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 items-center justify-start sm:justify-start">
          <button
            type="button"
            onClick={generateCaptcha}
            className="px-3 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
            title="Refresh CAPTCHA"
            aria-label="Refresh CAPTCHA"
          >
            ↻
          </button>
          {audioEnabled && (
            <button
              type="button"
              onClick={speakCaptcha}
              disabled={isSpeaking}
              className={`px-3 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0 ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              title="Listen to CAPTCHA"
              aria-label="Listen to CAPTCHA"
            >
              {isSpeaking ? '🔊🎵' : '🔊'}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="enableAudio"
          checked={audioEnabled}
          onChange={handleAudioToggle}
          className="mr-2"
        />
        <label htmlFor="enableAudio" className="text-sm text-gray-700">
          Enable Audio
        </label>
      </div>

      <div className="mt-3">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter CAPTCHA"
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${userInput !== '' && !isValid
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300'
            }`}
        />
        {userInput !== '' && !isValid && (
          <p className="text-red-500 text-sm mt-1">
            CAPTCHA does not match
          </p>
        )}
        {isValid && (
          <p className="text-green-500 text-sm mt-1">
            ✓ CAPTCHA verified successfully
          </p>
        )}
      </div>
    </div>
  );
};

// 4K Responsiveness Helper Functions
const get4KTextFieldStyle = (baseStyle) => ({
  ...baseStyle,
  "& .MuiInputLabel-root": {
    ...baseStyle["& .MuiInputLabel-root"],
    "@media (min-width: 2560px)": {
      fontSize: "24px",
    },
    "@media (min-width: 3200px)": {
      fontSize: "26px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "28px",
    },
  },
  "& .MuiInput-root": {
    ...baseStyle["& .MuiInput-root"],
    "@media (min-width: 2560px)": {
      fontSize: "24px",
    },
    "@media (min-width: 3200px)": {
      fontSize: "26px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "28px",
    },
  },
  "& .MuiFormHelperText-root": {
    ...baseStyle["& .MuiFormHelperText-root"],
    "@media (min-width: 2560px)": {
      fontSize: "16px",
    },
    "@media (min-width: 3200px)": {
      fontSize: "18px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "20px",
    },
  },
});

const get4KSelectStyle = (baseStyle) => ({
  ...baseStyle,
  "& .MuiSelect-select": {
    ...baseStyle["& .MuiSelect-select"],
    "@media (min-width: 2560px)": {
      fontSize: "24px",
    },
    "@media (min-width: 3200px)": {
      fontSize: "26px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "28px",
    },
  },
  "& .MuiInputLabel-root": {
    ...baseStyle["& .MuiInputLabel-root"],
    "@media (min-width: 2560px)": {
      fontSize: "24px",
    },
    "@media (min-width: 3200px)": {
      fontSize: "26px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "28px",
    },
  },
  "& .MuiFormHelperText-root": {
    ...baseStyle["& .MuiFormHelperText-root"],
    "@media (min-width: 2560px)": {
      fontSize: "16px",
    },
    "@media (min-width: 3200px)": {
      fontSize: "18px",
    },
    "@media (min-width: 3840px)": {
      fontSize: "20px",
    },
  },
});

const get4KMenuItemStyle = (baseStyle) => ({
  ...baseStyle,
  "@media (min-width: 2560px)": {
    fontSize: "22px",
  },
  "@media (min-width: 3200px)": {
    fontSize: "24px",
  },
  "@media (min-width: 3840px)": {
    fontSize: "26px",
  },
});

const get4KResponsiveClasses = () => ({
  container: "max-w-[1200px] 2xl:max-w-[1600px] 4k:max-w-[2000px]",
  padding: "px-4 sm:px-8 2xl:px-12 4k:px-16 py-8 sm:py-12 2xl:py-16 4k:py-20",
  baseText: "text-[20px] 2xl:text-[22px] 4k:text-[24px]",
  heroTitle: "text-[40px] sm:text-[60px] md:text-[40px] lg:text-[80px] 2xl:text-[90px] 4k:text-[100px]",
  heroSubtext: "text-[18px] sm:text-[20px] md:text-[15px] 2xl:text-[20px] 4k:text-[22px]",
  formMaxWidth: "max-w-2xl 2xl:max-w-3xl 4k:max-w-4xl",
  formPadding: "p-8 2xl:p-10 4k:p-12",
  formSpacing: "space-y-6 2xl:space-y-8 4k:space-y-10",
  gap: "gap-6 md:gap-8 2xl:gap-10 4k:gap-12",
  imageWidth: "w-full md:w-[230px] 2xl:w-[280px] 4k:w-[320px]",
  buttonPadding: "px-8 sm:px-12 2xl:px-16 4k:px-20 py-3 sm:py-4 2xl:py-5 4k:py-6",
  buttonText: "text-sm sm:text-base md:text-lg 2xl:text-xl 4k:text-2xl",
  checkboxScale: "scale-110 2xl:scale-125 4k:scale-150",
  legalText: "text-xs sm:text-sm 2xl:text-base 4k:text-lg",
});

// Styles
const textFieldStyle = {
  "& .MuiInputLabel-root": {
    color: "#4b2c5e",
    fontSize: "20px",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "#4b2c5e",
    },
  },
  "& .MuiInput-root": {
    fontSize: "20px",
    fontFamily: "Helvetica",
    color: "#4b2c5e",
    "&:before": {
      borderBottomColor: "rgba(75,44,94,0.4)",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "rgba(75,44,94,0.6)",
    },
    "&:after": {
      borderBottomColor: "#4b2c5e",
    },
    "&.Mui-focused": {
      color: "#4b2c5e",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: "14px",
    fontFamily: "Helvetica",
  },
  "& .Mui-error": {
    color: "#d32f2f",
    "&:after": {
      borderBottomColor: "#d32f2f",
    },
  },
};

const selectFieldStyle = {
  ...textFieldStyle,
  "& .MuiSelect-select": {
    fontSize: "20px",
    fontFamily: "Helvetica",
    color: "#4b2c5e",
  },
  "& .MuiSelect-icon": {
    color: "#4b2c5e",
  },
  "& .MuiInputLabel-root": {
    color: "#4b2c5e",
    fontSize: "20px",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "#4b2c5e",
    },
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "rgba(75,44,94,0.4)",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "rgba(75,44,94,0.6)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#4b2c5e",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "14px",
    fontFamily: "Helvetica",
    marginLeft: "0",
  },
};

const menuItemStyle = {
  fontSize: "18px",
  fontFamily: "Helvetica",
  color: "#4b2c5e",
};

// Enhanced styles with 4K support
const enhanced4KTextFieldStyle = get4KTextFieldStyle(textFieldStyle);
const enhanced4KSelectFieldStyle = get4KSelectStyle(selectFieldStyle);
const enhanced4KMenuItemStyle = get4KMenuItemStyle(menuItemStyle);

const ClaimOne = () => {
  const form = useRef();
  const responsive = get4KResponsiveClasses();

  // US States data
  const usStates = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
    { value: "DC", label: "District of Columbia" },
    { value: "AS", label: "American Samoa" },
    { value: "GU", label: "Guam" },
    { value: "MP", label: "Northern Mariana Islands" },
    { value: "PR", label: "Puerto Rico" },
    { value: "VI", label: "U.S. Virgin Islands" },
  ];

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailId: "",
    state: "",
    dateOfBirth: "",
    dateOfDiagnosis: "",
    diagnosisType: "",
    otherDiagnosis: "",
    jobTitle: "",
    privacyPolicy: false,
    humanVerification: false,
  });

  // State for form validation
  const [errors, setErrors] = useState({});
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for success dialog
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  // State for CAPTCHA
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaResetTrigger, setCaptchaResetTrigger] = useState(0);

  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");

  // Helper function to clear specific field error
  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle phone number formatting
    if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly,
      }));
      clearFieldError(name);
      return;
    }

    // Handle date validations
    if (name === "dateOfDiagnosis") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Set to end of today for comparison

      if (selectedDate > today) {
        setErrors(prev => ({
          ...prev,
          dateOfDiagnosis: "Diagnosis date cannot be in the future",
        }));
      } else {
        clearFieldError("dateOfDiagnosis");
      }
    }

    // Handle date of birth validation
    if (name === "dateOfBirth") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        setErrors(prev => ({
          ...prev,
          dateOfBirth: "You must be at least 18 years old",
        }));
      } else {
        clearFieldError("dateOfBirth");
      }
    }

    // Handle human verification checkbox - reset CAPTCHA when unchecked
    if (name === "humanVerification") {
      if (!checked) {
        // Reset CAPTCHA when unchecking human verification
        setIsCaptchaValid(false);
        setCaptchaResetTrigger(prev => prev + 1);
        clearFieldError("captcha");
      }
    }

    // Handle diagnosis type change - clear other diagnosis when not "other"
    if (name === "diagnosisType") {
      if (value !== "other") {
        setFormData(prev => ({
          ...prev,
          diagnosisType: value,
          otherDiagnosis: "", // Clear other diagnosis field
        }));
        clearFieldError("diagnosisType");
        clearFieldError("otherDiagnosis");
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field error when user starts typing/selecting
    clearFieldError(name);
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // Validate form before submission
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Zà-üÀ-Ü'\- ]{2,30}$/;
    return nameRegex.test(name.trim());
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = "Please enter a valid first name (letters only, 2-30 characters)";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = "Please enter a valid last name (letters only, 2-30 characters)";
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        newErrors.phoneNumber = "Phone number must be 10 digits";
      }
    }

    // Email validation
    if (!formData.emailId) {
      newErrors.emailId = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailId)) {
        newErrors.emailId = "Please enter a valid email address";
      }
    }

    // State validation
    if (!formData.state) {
      newErrors.state = "State is required";
    }

    // Date of Birth validation (18+ years)
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      }
      
      // Check if birth date is in the future
      if (birthDate > today) {
        newErrors.dateOfBirth = "Birth date cannot be in the future";
      }
    }

    // Date of Diagnosis validation
    if (!formData.dateOfDiagnosis) {
      newErrors.dateOfDiagnosis = "Date of diagnosis is required";
    } else {
      const diagnosisDate = new Date(formData.dateOfDiagnosis);
      today.setHours(23, 59, 59, 999); // Set to end of today for comparison
      
      if (diagnosisDate > today) {
        newErrors.dateOfDiagnosis = "Diagnosis date cannot be in the future";
      }
      
      // Logical check: diagnosis date should not be before birth date
      if (formData.dateOfBirth) {
        const birthDate = new Date(formData.dateOfBirth);
        if (diagnosisDate < birthDate) {
          newErrors.dateOfDiagnosis = "Diagnosis date cannot be before birth date";
        }
      }
    }

    // Diagnosis type validation
    if (!formData.diagnosisType) {
      newErrors.diagnosisType = "Diagnosis type is required";
    }

    // Other diagnosis validation - only required if "other" is selected
    if (formData.diagnosisType === "other" && !formData.otherDiagnosis.trim()) {
      newErrors.otherDiagnosis = "Please specify your diagnosis";
    }

    // Job title validation
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    // Checkbox validations
    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = "You must agree to the privacy policy";
    }

    if (!formData.humanVerification) {
      newErrors.humanVerification = "Please verify you are a person";
    }

    // CAPTCHA validation - only if human verification is checked
    if (formData.humanVerification && !isCaptchaValid) {
      newErrors.captcha = "Please complete the CAPTCHA verification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailId: "",
      state: "",
      dateOfBirth: "",
      dateOfDiagnosis: "",
      diagnosisType: "",
      otherDiagnosis: "",
      jobTitle: "",
      privacyPolicy: false,
      humanVerification: false,
    });
    setErrors({});
    setIsCaptchaValid(false);
    setCaptchaResetTrigger(prev => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setIsSubmitting(true);
    
    const submitData = {
      ...formData, 
      certId: certId,
      pingUrl: pingUrl,
      tokenUrl: tokenUrl,
    };

    try {
      const result = await sendClaimFormEmail(submitData);

      if (result.success) {
        setSuccessDialogOpen(true);
        resetForm();
        toast.success("Form submitted successfully!");
      } else {
        toast.error(result.message || "Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (isValid) => {
    setIsCaptchaValid(isValid);
    if (isValid) {
      clearFieldError("captcha");
    }
  };

  // Enhanced useEffect for TrustedForm monitoring
  useEffect(() => {
    let observer;
    let timeoutId;

    const initializeTrustedForm = () => {
      // Check for initial values
      const checkInitialValues = () => {
        const certUrlField = document.querySelector('input[name="xxTrustedFormCertUrl"]');
        const tokenField = document.querySelector('input[name="xxTrustedFormCertToken"]');
        const pingUrlField = document.querySelector('input[name="xxTrustedFormPingUrl"]');
        
        if (certUrlField?.value) {
          setCertId(certUrlField.value);
          console.log("Initial cert_id:", certUrlField.value);
        }
        if (tokenField?.value) {
          setTokenUrl(tokenField.value);
          console.log("Initial tokenUrl:", tokenField.value);
        }
        if (pingUrlField?.value) {
          setPingUrl(pingUrlField.value);
          console.log("Initial pingUrl:", pingUrlField.value);
        }
      };

      // Set up mutation observer
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "value"
          ) {
            const fieldName = mutation.target.name;
            
            // Extract values from all TrustedForm fields
            const certUrlField = document.querySelector('input[name="xxTrustedFormCertUrl"]');
            const tokenField = document.querySelector('input[name="xxTrustedFormCertToken"]');
            const pingUrlField = document.querySelector('input[name="xxTrustedFormPingUrl"]');
            
            const certUrlValue = certUrlField?.value || '';
            const tokenValue = tokenField?.value || '';
            const pingUrlValue = pingUrlField?.value || '';

            // Update state with the correct values
            setCertId(certUrlValue);
            setPingUrl(pingUrlValue);
            setTokenUrl(tokenValue);

            console.log("TrustedForm field update:", {
              fieldName,
              certId: certUrlValue,
              pingUrl: pingUrlValue,
              tokenUrl: tokenValue
            });

            // Fetch cert data if we have a cert URL and it's the cert field that changed
            if (certUrlValue && fieldName === 'xxTrustedFormCertUrl') {
              fetchCertData(certUrlValue);
            }
          }
        });
      });

      // Observe all TrustedForm fields for changes
      const fieldsToObserve = [
        'xxTrustedFormCertUrl',
        'xxTrustedFormCertToken', 
        'xxTrustedFormPingUrl'
      ];

      fieldsToObserve.forEach(fieldName => {
        const field = document.querySelector(`input[name="${fieldName}"]`);
        if (field) {
          observer.observe(field, { attributes: true });
          console.log(`Observing field: ${fieldName}`);
        }
      });

      // Check for initial values after a delay to allow TrustedForm to load
      timeoutId = setTimeout(checkInitialValues, 1000);
    };

    // Initialize TrustedForm monitoring
    initializeTrustedForm();

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const fetchCertData = async (certUrl) => {
    try {
      const response = await fetch(certUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("TrustedForm Cert Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching TrustedForm cert:", error);
      return null;
    }
  };

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };

  // Calculate max date for date of birth (18 years ago)
  const maxBirthDate = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split("T")[0];
  }, []);

  // Calculate max date for diagnosis (today)
  const maxDiagnosisDate = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  return (
    <>
      <div className={`hidden md:block w-full relative bg-[#faf3ec] overflow-hidden text-left ${responsive.baseText} text-[#4b2c5e] font-helvetica ${responsive.padding}`}>
        <ToastContainer position="top-right" />

        {/* Success Dialog */}
        <Dialog
          open={successDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              borderRadius: "16px",
              padding: "16px",
              maxWidth: "550px",
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontFamily: "Georgia",
              fontSize: "28px",
              color: "#4b2c5e",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {"Thank You for Reaching Out!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontFamily: "Helvetica",
                fontSize: "18px",
                color: "#4b2c5e",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              One of our representatives will be in touch with you shortly.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                backgroundColor: "#4b2c5e",
                color: "#f8f2e9",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#3a2249",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Hero Section */}
        <div className={`${responsive.container} mx-auto flex flex-col md:flex-row items-center md:items-start ${responsive.gap} mb-8 md:mb-16 2xl:mb-20 4k:mb-24`}>
          <div className={`${responsive.imageWidth} flex-shrink-0`}>
            <img
              src={ClaimFormImg}
              alt="Claim Form Illustration"
              className="w-full h-auto"
            />
          </div>
          <div className="flex-1 pt-4 md:pt-8 2xl:pt-12 4k:pt-16 text-left">
            <i className={`font-["Georgia"] relative ${responsive.heroTitle} inline-block text-[#4b2c5e]`}>
              <span>{`You Don't Have to `}</span>
              <span className="text-[rgba(75,44,94,0.66)]">
                Face This Alone{" "}
              </span>
            </i>
            <div className={`font-["Helvetica"] relative ${responsive.heroSubtext} text-[#4b2c5e] inline-block pb-[30px] 2xl:pb-[40px] 4k:pb-[50px]`}>
              {`If you, or a family member has been diagnosed with mesothelioma, don't hesitate to reach out. `}
            </div>
          </div>
        </div>

        <Grid
          item
          xs={12}
          md={6}
          className="pl-6 pr-20 md:pr-40 2xl:pr-32 4k:pr-20 md:pl-0 2xl:pl-8 4k:pl-16 flex justify-end items-end"
        >
          <motion.h1
            className="text-[#2E4A7D] font-georgia italic font-normal leading-tight text-left mx-auto px-4 xl:mt-32 2xl:mt-40 4k:mt-48 lg:w-[1600px] 2xl:w-[1800px] 4k:w-[2000px]"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.875rem)",
              width: "100%",
              maxWidth: "948px",
              marginBottom: "0",
              marginTop: "clamp(2rem, 8vw, 5rem)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full flex items-center justify-center w-[130%] 2xl:w-[120%] 4k:w-[110%]"
          >
            <Paper
              elevation={3}
              className={`w-full ${responsive.formMaxWidth} md:-mt-16 2xl:-mt-20 4k:-mt-24 md:ml-[400px] lg:ml-[30%] xl:ml-[-58%] 2xl:ml-[-42%] 4k:ml-[-35%] 2xl:-mt-30`}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "2rem",
                "@media (min-width: 1536px)": {
                  padding: "2.5rem",
                  borderRadius: "24px",
                },
                "@media (min-width: 2560px)": {
                  padding: "3rem",
                  borderRadius: "28px",
                },
                "@media (min-width: 3840px)": {
                  padding: "3.5rem",
                  borderRadius: "32px",
                },
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              }}
            >
              <motion.p
                className="text-[#4B2C5E] font-helvetica leading-normal italic
                                    mb-4 md:mb-6 2xl:mb-8 4k:mb-10
                                        text-base sm:text-lg md:text-xl 2xl:text-2xl 4k:text-3xl
                                            w-full sm:w-[80%] md:w-[580px] 2xl:w-[680px] 4k:max-w-[780px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                This exposure wasn't your choice. But taking action is.
                <br></br>
                <b>Start your free claim today. Let's fight together.</b>
              </motion.p>
              <form
                onSubmit={handleSubmit}
                id="lead-form"
                className={responsive.formSpacing}
                data-tf-element-role="offer"
              >
                {/* Hidden TrustedForm fields */}
                <input
                  type="hidden"
                  id="xxTrustedFormCertUrl"
                  name="xxTrustedFormCertUrl"
                  value={certId}
                />
                <input
                  type="hidden"
                  id="xxTrustedFormCertToken"
                  name="xxTrustedFormCertToken"
                  value={tokenUrl}
                />
                <input
                  type="hidden"
                  id="xxTrustedFormPingUrl"
                  name="xxTrustedFormPingUrl"
                  value={pingUrl}
                />

                <div className={`flex flex-col md:flex-row ${responsive.gap}`}>
                  <div className="w-full md:flex-1">
                    <TextField
                      id="firstName"
                      name="firstName"
                      label="First Name *"
                      variant="standard"
                      fullWidth
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      sx={enhanced4KTextFieldStyle}
                    />
                  </div>
                  <div className="w-full md:flex-1">
                    <TextField
                      id="lastName"
                      name="lastName"
                      label="Last Name *"
                      variant="standard"
                      type="text"
                      fullWidth
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      sx={enhanced4KTextFieldStyle}
                    />
                  </div>
                </div>

                <div className={`flex flex-col md:flex-row ${responsive.gap}`}>
                  <div className="w-full md:flex-1">
                    <TextField
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number *"
                      variant="standard"
                      type="tel"
                      inputProps={{
                        maxLength: 14,
                        inputMode: "numeric",
                      }}
                      fullWidth
                      value={formatPhoneNumber(formData.phoneNumber)}
                      onChange={handleChange}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                      placeholder="(XXX) XXX-XXXX"
                      sx={enhanced4KTextFieldStyle}
                    />
                  </div>
                  <div className="w-full md:flex-1">
                    <TextField
                      id="emailId"
                      name="emailId"
                      label="Email ID *"
                      variant="standard"
                      type="email"
                      fullWidth
                      value={formData.emailId}
                      onChange={handleChange}
                      error={!!errors.emailId}
                      helperText={errors.emailId}
                      sx={enhanced4KTextFieldStyle}
                    />
                  </div>
                </div>

                <div className={`flex flex-col md:flex-row ${responsive.gap}`}>
                  <div className="w-full md:flex-1">
                    <FormControl
                      fullWidth
                      error={!!errors.state}
                      variant="standard"
                    >
                      <InputLabel
                        id="state-label"
                        sx={{
                          color: "#4b2c5e",
                          fontSize: "20px",
                          fontFamily: "Helvetica",
                          fontWeight: "bold",
                          "&.Mui-focused": {
                            color: "#4b2c5e",
                          },
                          "@media (min-width: 2560px)": {
                            fontSize: "24px",
                          },
                          "@media (min-width: 3200px)": {
                            fontSize: "26px",
                          },
                          "@media (min-width: 3840px)": {
                            fontSize: "28px",
                          },
                        }}
                      >
                        State *
                      </InputLabel>
                      <Select
                        labelId="state-label"
                        id="state"
                        name="state"
                        value={formData.state}
                        label="State *"
                        onChange={handleChange}
                        sx={enhanced4KSelectFieldStyle}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              "& .MuiMenuItem-root": enhanced4KMenuItemStyle,
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Select a state</MenuItem>
                        {usStates.map((state) => (
                          <MenuItem key={state.value} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.state && (
                        <FormHelperText>{errors.state}</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="w-full md:flex-1">
                    <TextField
                      id="dateOfBirth"
                      name="dateOfBirth"
                      label="Date of Birth *"
                      type="date"
                      variant="standard"
                      fullWidth
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        max: maxBirthDate,
                      }}
                      sx={enhanced4KTextFieldStyle}
                    />
                  </div>
                </div>

                <div className={`flex flex-col md:flex-row ${responsive.gap}`}>
                  <div className="w-full md:flex-1">
                    <TextField
                      id="dateOfDiagnosis"
                      name="dateOfDiagnosis"
                      label="Date of Diagnosis *"
                      type="date"
                      variant="standard"
                      fullWidth
                      value={formData.dateOfDiagnosis}
                      onChange={handleChange}
                      error={!!errors.dateOfDiagnosis}
                      helperText={errors.dateOfDiagnosis || ""}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        max: maxDiagnosisDate,
                        min: formData.dateOfBirth || undefined, // Can't be before birth date
                      }}
                      sx={{
                        ...enhanced4KTextFieldStyle,
                        "& .MuiInput-input": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  </div>
                  <div className="w-full md:flex-1">
                    <FormControl
                      fullWidth
                      error={!!errors.diagnosisType}
                      variant="standard"
                    >
                      <InputLabel
                        id="diagnosis-type-label"
                        sx={{
                          color: "#4b2c5e",
                          fontSize: "20px",
                          fontFamily: "Helvetica",
                          fontWeight: "bold",
                          "&.Mui-focused": {
                            color: "#4b2c5e",
                          },
                          "@media (min-width: 2560px)": {
                            fontSize: "24px",
                          },
                          "@media (min-width: 3200px)": {
                            fontSize: "26px",
                          },
                          "@media (min-width: 3840px)": {
                            fontSize: "28px",
                          },
                        }}
                      >
                        Type of Diagnosis *
                      </InputLabel>
                      <Select
                        labelId="diagnosis-type-label"
                        id="diagnosisType"
                        name="diagnosisType"
                        value={formData.diagnosisType}
                        label="Type of Diagnosis *"
                        onChange={handleChange}
                        sx={enhanced4KSelectFieldStyle}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              "& .MuiMenuItem-root": enhanced4KMenuItemStyle,
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Select diagnosis type</MenuItem>
                        <MenuItem value="mesothelioma">Mesothelioma</MenuItem>
                        <MenuItem value="lung_cancer">Lung Cancer</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                      {errors.diagnosisType && (
                        <FormHelperText>{errors.diagnosisType}</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                </div>

                {formData.diagnosisType === "other" && (
                  <div>
                    <TextField
                      id="otherDiagnosis"
                      name="otherDiagnosis"
                      label="Please specify your diagnosis *"
                      variant="standard"
                      fullWidth
                      value={formData.otherDiagnosis}
                      onChange={handleChange}
                      error={!!errors.otherDiagnosis}
                      helperText={errors.otherDiagnosis}
                      sx={enhanced4KTextFieldStyle}
                    />
                  </div>
                )}

                <div>
                  <TextField
                    id="jobTitle"
                    name="jobTitle"
                    label="Job Title *"
                    variant="standard"
                    fullWidth
                    value={formData.jobTitle}
                    onChange={handleChange}
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle}
                    sx={enhanced4KTextFieldStyle}
                  />
                </div>

                <div className="space-y-4 2xl:space-y-6 4k:space-y-8">
                  <div className="flex items-start gap-4 2xl:gap-6 4k:gap-8">
                    <input
                      type="checkbox"
                      name="privacyPolicy"
                      checked={formData.privacyPolicy}
                      onChange={handleChange}
                      className={`mt-1 2xl:mt-2 4k:mt-3 ${responsive.checkboxScale}`}
                    />
                    <div className={`${responsive.legalText} font-helvetica`}>
                      <span
                        className="block"
                        data-tf-element-role="consent-opt-in"
                      >
                        By submitting this form and signing up for texts, I consent to the{" "}
                        <a
                          href="/PrivacyPolicy"
                          className="underline hover:text-blue-200"
                        >
                          privacy policy
                        </a>{" "}
                        and{" "}
                        <a
                          href="/Disclaimer"
                          className="underline hover:text-blue-200"
                        >
                          disclaimer
                        </a>
                        &nbsp; and give my express written consent to affiliates and/or lawyer to contact me at the number provided above, even if this number is a wireless number or if I am presently listed on a Do Not Call list. I understand that I may be contacted by telephone, email, text message or mail regarding general customer service including case options, and reminders and follow-ups and that I may be called using automatic dialing equipment. Message frequency varies. Unsubscribe at any time by replying STOP or clicking the unsubscribe link (where available). Reply HELP for help. This is Legal advertising.
                      </span>
                    </div>
                  </div>
                  {errors.privacyPolicy && (
                    <div className={`text-red-500 ${responsive.legalText}`}>
                      {errors.privacyPolicy}
                    </div>
                  )}

                  <div className="flex items-start gap-4 2xl:gap-6 4k:gap-8 font-helvetica">
                    <input
                      type="checkbox"
                      name="humanVerification"
                      checked={formData.humanVerification}
                      onChange={handleChange}
                      data-tf-element-role="consent-opt-in"
                      className={`mt-1 2xl:mt-2 4k:mt-3 ${responsive.checkboxScale}`}
                    />
                    <div className={responsive.legalText}>
                      Please check this box to verify you're a person.
                    </div>
                  </div>
                  {errors.humanVerification && (
                    <div className={`text-red-500 ${responsive.legalText}`}>
                      {errors.humanVerification}
                    </div>
                  )}

                  {/* CAPTCHA Component - Shows only when human verification is checked */}
                  {formData.humanVerification && (
                    <div className="mt-4 2xl:mt-6 4k:mt-8">
                      <CustomCaptcha 
                        onCaptchaChange={handleCaptchaChange}
                        resetTrigger={captchaResetTrigger}
                      />
                      {errors.captcha && (
                        <div className={`text-red-500 ${responsive.legalText} mt-2`}>
                          {errors.captcha}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-left sm:text-left">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-tf-element-role="consent-opt-in"
                    className={`rounded-[10px] 2xl:rounded-[12px] 4k:rounded-[14px] bg-[#4b2c5e] text-[#f8f2e9] ${responsive.buttonPadding} font-bold transition-colors ${responsive.buttonText} flex items-center justify-center gap-2 2xl:gap-3 4k:gap-4 ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#3a2249]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress size={20} color="inherit" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </Paper>
          </motion.div>
        </Grid>
      </div>

      {/* Mobile Section */}
      <div className="block md:hidden bg-[#FAF3EC] font-georgia p-5">
        <ToastContainer position="top-right" />

        {/* Success Dialog - Mobile */}
        <Dialog
          open={successDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              borderRadius: "16px",
              padding: "16px",
              maxWidth: "550px",
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontFamily: "Georgia",
              fontSize: "28px",
              color: "#4b2c5e",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {"Thank You for Reaching Out!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontFamily: "Helvetica",
                fontSize: "18px",
                color: "#4b2c5e",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              One of our representatives will be in touch with you shortly.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                backgroundColor: "#4b2c5e",
                color: "#f8f2e9",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#3a2249",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Hero Section - Mobile */}
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-8 md:mb-16">
          <div className="w-full md:w-[450px] flex-shrink-0">
            <img
              src={ClaimFormImg}
              alt="Claim Form Illustration"
              className="w-full h-auto"
            />
          </div>
          <div className="flex-1 pt-4 md:pt-8 text-left">
            <i className='font-["Georgia"] relative text-[40px] sm:text-[60px] md:text-[80px] lg:text-[80px] inline-block text-[#4b2c5e]'>
              <span>{`You Don't Have to `}</span>
              <span className="text-[rgba(75,44,94,0.66)]">
                Face This Alone{" "}
              </span>
            </i>
            <div className='font-["Helvetica"] relative text-[18px] sm:text-[20px] md:text-[24px] text-[#4b2c5e] inline-block pb-[30px]'>{`If you, or a family member has been diagnosed with mesothelioma, don't hesitate to reach out. `}</div>
          </div>
        </div>
        
        <div className="p-6 rounded-[20px] mt-8 bg-white shadow-md mx-auto max-w-[500px]">
          <p className="text-[#4B2C5E] font-georgia text-xl italic mb-6 text-center">
            <em>Your journey to justice starts here.</em>
          </p>

          <form
            onSubmit={handleSubmit}
            id="lead-form-mobile"
            className="space-y-6"
            data-tf-element-role="offer"
          >
            {/* Hidden TrustedForm fields - Mobile */}
            <input
              type="hidden"
              id="xxTrustedFormCertUrl_mobile"
              name="xxTrustedFormCertUrl"
              value={certId}
            />
            <input
              type="hidden"
              id="xxTrustedFormCertToken_mobile"
              name="xxTrustedFormCertToken"
              value={tokenUrl}
            />
            <input
              type="hidden"
              id="xxTrustedFormPingUrl_mobile"
              name="xxTrustedFormPingUrl"
              value={pingUrl}
            />

            <div className="flex flex-col gap-6">
              <div className="w-full">
                <TextField
                  id="firstName_mobile"
                  name="firstName"
                  label="First Name *"
                  variant="standard"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={textFieldStyle}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="lastName_mobile"
                  name="lastName"
                  label="Last Name *"
                  variant="standard"
                  type="text"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={textFieldStyle}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="w-full">
                <TextField
                  id="phoneNumber_mobile"
                  name="phoneNumber"
                  label="Phone Number *"
                  variant="standard"
                  type="tel"
                  inputProps={{
                    maxLength: 14,
                    inputMode: "numeric",
                  }}
                  fullWidth
                  value={formatPhoneNumber(formData.phoneNumber)}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  placeholder="(XXX) XXX-XXXX"
                  sx={textFieldStyle}
                />
              </div>
              <div className="w-full">
                <TextField
                  id="emailId_mobile"
                  name="emailId"
                  label="Email ID *"
                  variant="standard"
                  type="email"
                  fullWidth
                  value={formData.emailId}
                  onChange={handleChange}
                  error={!!errors.emailId}
                  helperText={errors.emailId}
                  sx={textFieldStyle}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="w-full">
                <FormControl
                  fullWidth
                  error={!!errors.state}
                  variant="standard"
                >
                  <InputLabel
                    id="state-label-mobile"
                    sx={{
                      color: "#4b2c5e",
                      fontSize: "20px",
                      fontFamily: "Helvetica",
                      fontWeight: "bold",
                      "&.Mui-focused": {
                        color: "#4b2c5e",
                      },
                    }}
                  >
                    State *
                  </InputLabel>
                  <Select
                    labelId="state-label-mobile"
                    id="state_mobile"
                    name="state"
                    value={formData.state}
                    label="State *"
                    onChange={handleChange}
                    sx={selectFieldStyle}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root": menuItemStyle,
                        },
                      },
                    }}
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    {usStates.map((state) => (
                      <MenuItem key={state.value} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && (
                    <FormHelperText>{errors.state}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="w-full">
                <TextField
                  id="dateOfBirth_mobile"
                  name="dateOfBirth"
                  label="Date of Birth *"
                  type="date"
                  variant="standard"
                  fullWidth
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    max: maxBirthDate,
                  }}
                  sx={textFieldStyle}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="w-full">
                <TextField
                  id="dateOfDiagnosis_mobile"
                  name="dateOfDiagnosis"
                  label="Date of Diagnosis *"
                  type="date"
                  variant="standard"
                  fullWidth
                  value={formData.dateOfDiagnosis}
                  onChange={handleChange}
                  error={!!errors.dateOfDiagnosis}
                  helperText={errors.dateOfDiagnosis || ""}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    max: maxDiagnosisDate,
                    min: formData.dateOfBirth || undefined,
                  }}
                  sx={{
                    ...textFieldStyle,
                    "& .MuiInput-input": {
                      cursor: "pointer",
                    },
                  }}
                />
              </div>
              <div className="w-full">
                <FormControl
                  fullWidth
                  error={!!errors.diagnosisType}
                  variant="standard"
                >
                  <InputLabel
                    id="diagnosis-type-label-mobile"
                    sx={{
                      color: "#4b2c5e",
                      fontSize: "20px",
                      fontFamily: "Helvetica",
                      fontWeight: "bold",
                      "&.Mui-focused": {
                        color: "#4b2c5e",
                      },
                    }}
                  >
                    Type of Diagnosis *
                  </InputLabel>
                  <Select
                    labelId="diagnosis-type-label-mobile"
                    id="diagnosisType_mobile"
                    name="diagnosisType"
                    value={formData.diagnosisType}
                    label="Type of Diagnosis *"
                    onChange={handleChange}
                    sx={selectFieldStyle}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root": menuItemStyle,
                        },
                      },
                    }}
                  >
                    <MenuItem value="">Select diagnosis type</MenuItem>
                    <MenuItem value="mesothelioma">Mesothelioma</MenuItem>
                    <MenuItem value="lung_cancer">Lung Cancer</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.diagnosisType && (
                    <FormHelperText>{errors.diagnosisType}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>

            {formData.diagnosisType === "other" && (
              <div>
                <TextField
                  id="otherDiagnosis_mobile"
                  name="otherDiagnosis"
                  label="Please specify your diagnosis *"
                  variant="standard"
                  fullWidth
                  value={formData.otherDiagnosis}
                  onChange={handleChange}
                  error={!!errors.otherDiagnosis}
                  helperText={errors.otherDiagnosis}
                  sx={textFieldStyle}
                />
              </div>
            )}

            <div>
              <TextField
                id="jobTitle_mobile"
                name="jobTitle"
                label="Job Title *"
                variant="standard"
                fullWidth
                value={formData.jobTitle}
                onChange={handleChange}
                error={!!errors.jobTitle}
                helperText={errors.jobTitle}
                sx={textFieldStyle}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div className="text-xs sm:text-sm font-helvetica">
                  <span className="block" data-tf-element-role="consent-opt-in">
                    I agree to the{" "}
                    <a
                      href="/PrivacyPolicy"
                      className="underline hover:text-blue-200"
                    >
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="/Disclaimer"
                      className="underline hover:text-blue-200"
                    >
                      disclaimer
                    </a>
                    &nbsp; and give my express written consent, affiliates
                    and/or lawyer to contact you at the number provided above,
                    even if this number is a wireless number or if I am
                    presently listed on a Do Not Call list. I understand that I
                    may be contacted by telephone, email, text message or mail
                    regarding case options and that I may be called using
                    automatic dialing equipment. Message and data rates may
                    apply. My consent does not require purchase. This is Legal
                    advertising.
                  </span>
                </div>
              </div>
              {errors.privacyPolicy && (
                <div className="text-red-500 text-sm">
                  {errors.privacyPolicy}
                </div>
              )}

              <div className="flex items-start gap-4 font-helvetica">
                <input
                  type="checkbox"
                  name="humanVerification"
                  checked={formData.humanVerification}
                  onChange={handleChange}
                  data-tf-element-role="consent-opt-in"
                  className="mt-1"
                />
                <div className="text-xs sm:text-sm">
                  Please check this box to verify you're a person.
                </div>
              </div>
              {errors.humanVerification && (
                <div className="text-red-500 text-sm">
                  {errors.humanVerification}
                </div>
              )}

              {/* CAPTCHA Component - Mobile - Shows only when human verification is checked */}
              {formData.humanVerification && (
                <div>
                  <CustomCaptcha 
                    onCaptchaChange={handleCaptchaChange}
                    resetTrigger={captchaResetTrigger}
                  />
                  {errors.captcha && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.captcha}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-left sm:text-left">
              <button
                type="submit"
                disabled={isSubmitting}
                data-tf-element-role="consent-opt-in"
                className={`rounded-[10px] bg-[#4b2c5e] text-[#f8f2e9] px-8 sm:px-12 py-3 sm:py-4 font-bold transition-colors text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#3a2249]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClaimOne;