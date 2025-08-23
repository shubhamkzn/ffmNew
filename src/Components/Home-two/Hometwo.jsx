import React, { useState, useRef, useEffect } from "react";
import Vector2 from "../../assets/Vector2.png";
import Vector1 from "../../assets/Vector1.png";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import './Hometwo.css'
import { sendHomeFormEmail } from "../../utils/emailService";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
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

// Phone validation utility
const isValidUSPhone = (phone) => {
  const phoneRegex = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  return phoneRegex.test(phone);
};

const Hometwo = () => {
  const formRef = useRef();

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailId: "",
    dateOfBirth: "",
    dateOfDiagnosis: "",
    diagnosisType: "",
    otherDiagnosis: "",
    jobTitle: "",
    settlement: false,
    privacyPolicy: false,
    humanVerification: false,
  });

  // Add state for form errors
  const [errors, setErrors] = useState({});
  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for success dialog
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  
  // CAPTCHA related states
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaResetTrigger, setCaptchaResetTrigger] = useState(0);

  // Phone number formatting and validation for US numbers
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  // Handle CAPTCHA change
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    // Clear CAPTCHA error when user solves it
    if (errors.captcha && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "",
      }));
    }
  };

  // TrustedForm integration
  useEffect(() => {
    let observerInstance = null;
    let timeoutId = null;

    const initializeTrustedFormObserver = () => {
      try {
        // Create observer to watch for TrustedForm field updates
        observerInstance = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "value") {
              const target = mutation.target;

              try {
                if (target?.name === "xxTrustedFormCertUrl" && target.value) {
                  setCertId(target.value);
                  // console.log("TrustedForm Cert ID updated:", target.value);
                }

                if (target?.name === "xxTrustedFormPingUrl" && target.value) {
                  setPingUrl(target.value);
                  // console.log("TrustedForm Ping URL updated:", target.value);
                }

                if (target?.name === "xxTrustedFormCertToken" && target.value) {
                  setTokenUrl(target.value);
                  // console.log("TrustedForm Token URL updated:", target.value);
                }
              } catch (error) {
                console.warn("TrustedForm observer error:", error);
              }
            }
          });
        });

        // Start observing TrustedForm fields
        const startObserving = () => {
          try {
            const trustedFormFields = document.querySelectorAll(
              '[name="xxTrustedFormCertUrl"], [name="xxTrustedFormPingUrl"], [name="xxTrustedFormCertToken"]'
            );

            trustedFormFields.forEach((field) => {
              if (field && observerInstance) {
                observerInstance.observe(field, { 
                  attributes: true, 
                  attributeFilter: ['value'] 
                });

                // Check if values are already populated
                if (field.value) {
                  switch (field.name) {
                    case "xxTrustedFormCertUrl":
                      setCertId(field.value);
                      // console.log("TrustedForm Cert ID initialized:", field.value);
                      break;
                    case "xxTrustedFormPingUrl":
                      setPingUrl(field.value);
                      // console.log("TrustedForm Ping URL initialized:", field.value);
                      break;
                    case "xxTrustedFormCertToken":
                      setTokenUrl(field.value);
                      // console.log("TrustedForm Token URL initialized:", field.value);
                      break;
                    default:
                      break;
                  }
                }
              }
            });
          } catch (error) {
            console.warn("Error starting TrustedForm observation:", error);
          }
        };

        // Wait for TrustedForm script to load and populate fields
        timeoutId = setTimeout(startObserving, 1000);
      } catch (error) {
        console.error("Error initializing TrustedForm observer:", error);
      }
    };

    initializeTrustedFormObserver();

    return () => {
      try {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (observerInstance) {
          observerInstance.disconnect();
        }
      } catch (error) {
        console.error("Error cleaning up TrustedForm observer:", error);
      }
    };
  }, []);

  const fetchCertData = async (certUrl) => {
    try {
      const response = await fetch(certUrl);
      const data = await response.json();
      console.log("TrustedForm Cert Data:", data);
    } catch (error) {
      console.error("Error fetching TrustedForm cert:", error);
    }
  };
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    
    // Special handling for phone number
    if (name === 'phoneNumber') {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 10) {
        newValue = cleaned;
      } else {
        return; // Don't update if more than 10 digits
      }
    }
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    // Clear error when user starts typing in the field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    // Reset CAPTCHA when humanVerification is unchecked
    if (name === 'humanVerification' && !checked) {
      setCaptchaValue("");
      setCaptchaResetTrigger(prev => prev + 1);
      // Clear CAPTCHA error
      if (errors.captcha) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          captcha: "",
        }));
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 1) {
      newErrors.firstName = "First name must be at least 1 character";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 1) {
      newErrors.lastName = "Last name must be at least 1 character";
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      const digits = formData.phoneNumber.replace(/\D/g, "");
      if (digits.length !== 10) {
        newErrors.phoneNumber = "Phone number must be exactly 10 digits";
      } else if (!isValidUSPhone(digits)) {
        newErrors.phoneNumber = "Please enter a valid US phone number";
      }
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email is required";
    } else {
      // Email validation with regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailId)) {
        newErrors.emailId = "Please enter a valid email address";
      }
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.dateOfDiagnosis.trim()) {
      newErrors.dateOfDiagnosis = "Date of diagnosis is required";
    }

    if (!formData.diagnosisType.trim()) {
      newErrors.diagnosisType = "Diagnosis type is required";
    }

    if (formData.diagnosisType === "other" && !formData.otherDiagnosis.trim()) {
      newErrors.otherDiagnosis = "Please specify your diagnosis type";
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = "You must agree to the privacy policy and disclaimer";
    }

    if (!formData.humanVerification) {
      newErrors.humanVerification = "Please verify that you are human";
    }

    // Validate CAPTCHA only if human verification is checked
    if (formData.humanVerification && !captchaValue) {
      newErrors.captcha = "Please complete the CAPTCHA verification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const submitData = {
        ...formData,
        certId: certId,
        pingUrl: pingUrl,
        tokenUrl: tokenUrl,
      };

      try {
        // Replace with your actual API call
        const result = await sendHomeFormEmail(submitData);
        // const result = { success: true }; // Placeholder

        if (result.success) {
          setSuccessDialogOpen(true);
          // Reset form data
          setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailId: "",
            dateOfBirth: "",
            dateOfDiagnosis: "",
            diagnosisType: "",
            otherDiagnosis: "",
            jobTitle: "",
            settlement: false,
            privacyPolicy: false,
            humanVerification: false,
          });
          // Reset CAPTCHA
          setCaptchaValue("");
          setCaptchaResetTrigger(prev => prev + 1);
          // Clear errors
          setErrors({});
        } else {
          toast.error("Error submitting form. Please try again.");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Error submitting form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please correct the errors in the form");
    }
  };


  // Define responsive styles object for consistency
  const responsive = {
    legalText: `text-xs sm:text-sm 2xl:text-base 
                [@media_(min-width:_1800px)]:text-[clamp(16px,_1vw,_17px)]
                [@media_(min-width:_2200px)]:text-[clamp(17px,_0.9vw,_18px)]
                [@media_(min-width:_2560px)]:text-lg 
                [@media_(min-width:_3840px)]:text-xl`,
  };

  // Define text field styles
const textFieldStyle = {
  marginBottom: "16px", // Add bottom margin
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
    borderBottomColor: "#4b2c5e",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#4b2c5e",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#4b2c5e",
  },
  "& .MuiInput-input": {
    fontSize: "18px",
    color: "#4b2c5e",
    fontFamily: "Helvetica",
  },
};


  const selectFieldStyle = {
    "& .MuiSelect-select": {
      fontSize: "18px",
      color: "#4b2c5e",
      fontFamily: "Helvetica",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#4b2c5e",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#4b2c5e",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#4b2c5e",
    },
  };

  const menuItemStyle = {
    fontSize: "16px",
    fontFamily: "Helvetica",
    color: "#4b2c5e",
    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
    "&.Mui-selected": {
      backgroundColor: "#e5e7eb",
      "&:hover": {
        backgroundColor: "#d1d5db",
      },
    },
  };

  return (
    <>
      <ToastContainer position="top-right" />

      {/* Hidden TrustedForm Fields - centralized */}
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

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="home-dialog-title"
        aria-describedby="home-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "16px",
            padding: "16px",
            maxWidth: "550px",
          },
        }}
      >
        <DialogTitle
          id="home-dialog-title"
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
            id="home-dialog-description"
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
              backgroundColor: "#2e4a7d",
              color: "#f8f2e9",
              fontFamily: "Helvetica",
              fontWeight: "bold",
              padding: "8px 24px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#243c68",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Desktop Version */}
      <div className="hidden md:block bg-[#FAF3EC] font-georgia m-0 p-0 2xl:mt-[-30%] 
                      [@media_(min-width:_1800px)]:mt-[-28%]
                      [@media_(min-width:_2200px)]:mt-[-26%]
                      [@media_(min-width:_2560px)]:mt-[-25%] 
                      [@media_(min-width:_3840px)]:mt-[-20%]">
         <div className="bg-[#FAF3EC] font-georgia m-0 p-0">
          <div className="w-full md:w-[900px] lg:w-[1100px] xl:w-[1280px] 2xl:w-[1440px] 
                          [@media_(min-width:_1800px)]:w-[1600px]
                          [@media_(min-width:_2200px)]:w-[1700px]
                          [@media_(min-width:_2560px)]:w-[1800px] 
                          [@media_(min-width:_3840px)]:w-[2400px] 
                          
                          h-[1400px] 2xl:h-[1600px] 
                          [@media_(min-width:_1800px)]:h-[1600px]
                          [@media_(min-width:_2200px)]:h-[1700px]
                          [@media_(min-width:_2560px)]:h-[1800px] 
                          [@media_(min-width:_3840px)]:h-[2400px] 
                          flex-shrink-0 2xl:ml-[20%] 
                          [@media_(min-width:_1800px)]:ml-[18%]
                          [@media_(min-width:_2200px)]:ml-[16%]
                          [@media_(min-width:_2560px)]:ml-[15%] 
                          [@media_(min-width:_3840px)]:ml-[10%] 
                          mx-auto">   
            <div className="absolute mt-32 2xl:mt-40 
                            [@media_(min-width:_1800px)]:mt-44
                            [@media_(min-width:_2200px)]:mt-46
                            [@media_(min-width:_2560px)]:mt-48 
                            [@media_(min-width:_3840px)]:mt-64 
                            w-auto">
              {/* Replace with your actual image imports */}
                <img
                  src={Vector2}
                  alt="Senior Couple"
                  className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[250px] lg:h-[250px] xl:w-[300px] xl:h-[300px] 
                            2xl:w-[358px] 2xl:h-[364px] 
                            [@media_(min-width:_1800px)]:w-[380px] [@media_(min-width:_1800px)]:h-[385px]
                            [@media_(min-width:_2200px)]:w-[405px] [@media_(min-width:_2200px)]:h-[410px]
                            [@media_(min-width:_2560px)]:w-[430px] [@media_(min-width:_2560px)]:h-[437px] 
                            [@media_(min-width:_3840px)]:w-[540px] [@media_(min-width:_3840px)]:h-[550px] 
                            ml-[5%] lg:ml-[30px] xl:ml-[5px] 2xl:ml-[1px] 
                            [@media_(min-width:_1800px)]:ml-[1.5px]
                            [@media_(min-width:_2200px)]:ml-[1.8px]
                            [@media_(min-width:_2560px)]:ml-[2px] 
                            [@media_(min-width:_3840px)]:ml-[3px] 
                            mt-[8%] md:mt-[-12%] xl:mt-[36px] 2xl:mt-[36px] 
                            [@media_(min-width:_1800px)]:mt-[40px]
                            [@media_(min-width:_2200px)]:mt-[42px]
                            [@media_(min-width:_2560px)]:mt-[45px] 
                            [@media_(min-width:_3840px)]:mt-[55px] 
                            object-contain"
                />
                <img
                  src={Vector1}
                  alt="Family"
                  className="w-[70px] h-[48px] ml-[40%] mt-[10%] transform rotate-[1.701deg] hidden md:block 
                            md:w-[113px] md:h-[111px] md:ml-[54%] lg:w-[170px] lg:h-[170px] lg:ml-[120px] lg:mt-[0%] 
                            xl:w-[200px] xl:h-[200px] xl:ml-[140px] xl:mt-[1px] 
                            2xl:w-[220px] 2xl:h-[136px] 2xl:ml-[170px] 2xl:mt-[0px] 
                            [@media_(min-width:_1800px)]:w-[235px] [@media_(min-width:_1800px)]:h-[145px] [@media_(min-width:_1800px)]:ml-[185px] [@media_(min-width:_1800px)]:mt-[0px]
                            [@media_(min-width:_2200px)]:w-[250px] [@media_(min-width:_2200px)]:h-[155px] [@media_(min-width:_2200px)]:ml-[195px] [@media_(min-width:_2200px)]:mt-[0px]
                            [@media_(min-width:_2560px)]:w-[265px] [@media_(min-width:_2560px)]:h-[164px] [@media_(min-width:_2560px)]:ml-[204px] [@media_(min-width:_2560px)]:mt-[0px] 
                            [@media_(min-width:_3840px)]:w-[330px] [@media_(min-width:_3840px)]:h-[205px] [@media_(min-width:_3840px)]:ml-[255px] [@media_(min-width:_3840px)]:mt-[0px] 
                            flex-shrink-0 absolute object-contain"
                /> 
            </div>
            <div className="flex flex-col items-center text-center h-auto ">
              <div className="mt-[15%] ml-[75%] sm:ml-[23%] lg:ml-[28%] 
                              2xl:ml-[30%] 
                              [@media_(min-width:_1800px)]:ml-[30.5%]
                              [@media_(min-width:_2200px)]:ml-[31%]
                              [@media_(min-width:_2560px)]:ml-[32%] 
                              [@media_(min-width:_3840px)]:ml-[35%] 
                              flex flex-wrap gap-4 text-[#4B2C5E] font-feature-dlig font-georgia 
                              text-[96px] md:text-[50px] lg:text-[70px] xl:text-[96px] 
                              2xl:text-[120px] 
                              [@media_(min-width:_1800px)]:text-[clamp(120px,_7vw,_130px)]
                              [@media_(min-width:_2200px)]:text-[clamp(130px,_6.5vw,_135px)]
                              [@media_(min-width:_2560px)]:text-[140px] 
                              [@media_(min-width:_3840px)]:text-[180px] 
                              italic font-normal leading-normal xl:mt-[242px] 2xl:mt-[274px] 
                              [@media_(min-width:_1800px)]:mt-[295px]
                              [@media_(min-width:_2200px)]:mt-[310px]
                              [@media_(min-width:_2560px)]:mt-[328px] 
                              [@media_(min-width:_3840px)]:mt-[420px] 
                              px-0 lg:px-8 xl:px-0 2xl:px-4 
                              [@media_(min-width:_1800px)]:px-5
                              [@media_(min-width:_2200px)]:px-5.5
                              [@media_(min-width:_2560px)]:px-6 
                              [@media_(min-width:_3840px)]:px-8 
                              items-start text-left">
                <h1 className="mt-15 text-left text-[96px] md:text-[55px] lg:text-[70px] xl:text-[96px] 
                               2xl:text-[120px] 
                               [@media_(min-width:_1800px)]:text-[clamp(120px,_7vw,_130px)]
                               [@media_(min-width:_2200px)]:text-[clamp(130px,_6.5vw,_135px)]
                               [@media_(min-width:_2560px)]:text-[140px] 
                               [@media_(min-width:_3840px)]:text-[180px] 
                               break-words lg:whitespace-normal w-full">
                  <span className="italic font-georgia">At 70,</span>
                  <br />
                  <span className="text-[#4B2C5E]/60 italic font-georgia">Every Day</span>
                  <span className="text-[#4B2C5E]/60 italic font-georgia"> Matters</span>
                </h1>      
                <p className="text-[#4B2C5E] font-helvetica text-[24px] md:text-[16px] lg:text-[20px] xl:text-[24px] 
                              2xl:text-[30px] 
                              [@media_(min-width:_1800px)]:text-[clamp(30px,_2vw,_33px)]
                              [@media_(min-width:_2200px)]:text-[clamp(33px,_1.8vw,_35px)]
                              [@media_(min-width:_2560px)]:text-[36px] 
                              [@media_(min-width:_3840px)]:text-[46px] 
                              font-normal max-w-md md:max-w-[534px] lg:max-w-none 
                              2xl:max-w-[900px] 
                              [@media_(min-width:_1800px)]:max-w-[800px]
                              [@media_(min-width:_2200px)]:max-w-[850px]
                              [@media_(min-width:_2560px)]:max-w-[770px] 
                              [@media_(min-width:_3840px)]:max-w-[960px] 
                              w-full h-auto text-left md:pr-[50px] lg:pr-[100px] xl:pr-0 
                              2xl:pr-[20px] 
                              [@media_(min-width:_1800px)]:pr-[25px]
                              [@media_(min-width:_2200px)]:pr-[28px]
                              [@media_(min-width:_2560px)]:pr-[30px] 
                              [@media_(min-width:_3840px)]:pr-[40px] 
                              leading-normal 2xl:leading-relaxed 
                              [@media_(min-width:_1800px)]:leading-relaxed
                              [@media_(min-width:_2200px)]:leading-relaxed
                              [@media_(min-width:_3840px)]:leading-normal">
                  You're a parent, a partner, a friend-and you deserve more than care. You deserve compassion, presence, and someone who walks beside you every step of the way.
                </p>
              </div>
            </div>

            <div className="p-[30px] 2xl:p-[40px] 
                            [@media_(min-width:_1800px)]:p-[45px]
                            [@media_(min-width:_2200px)]:p-[48px]
                            [@media_(min-width:_2560px)]:p-[50px] 
                            [@media_(min-width:_3840px)]:p-[60px] 
                            mt-[0.5%] ml-[42%] sm:w-[710px] sm:ml-[5%] lg:ml-[19%] lg:mt-[6.5%] 
                            w-[817px] 
                            [@media_(min-width:_1800px)]:w-[950px]
                            [@media_(min-width:_2200px)]:w-[1050px]
                            [@media_(min-width:_2560px)]:w-[1180px] 
                            h-auto

                            text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)] 
                            2xl:shadow-[0_6px_12px_rgba(0,0,0,0.12)] 
                            [@media_(min-width:_1800px)]:shadow-[0_7px_14px_rgba(0,0,0,0.13)]
                            [@media_(min-width:_2200px)]:shadow-[0_7.5px_15px_rgba(0,0,0,0.14)]
                            [@media_(min-width:_3840px)]:shadow-[0_8px_16px_rgba(0,0,0,0.15)] 
                            rounded-[20px] 2xl:rounded-[25px] 
                            [@media_(min-width:_1800px)]:rounded-[27px]
                            [@media_(min-width:_2200px)]:rounded-[29px]
                            [@media_(min-width:_2560px)]:rounded-[30px] 
                            [@media_(min-width:_3840px)]:rounded-[35px] 
                            bg-white absolute z-10 xl:w-[800px] xl:ml-[25%] 
                            2xl:ml-[14%] 
                            [@media_(min-width:_1800px)]:ml-[13%]
                            [@media_(min-width:_2200px)]:ml-[12.5%]
                            [@media_(min-width:_2560px)]:ml-[12%] 
                            [@media_(min-width:_3840px)]:ml-[10%] 
                            xl:h-[730px] xl:mt-0 2xl:w-[40%] 2xl:h-[757px] 2xl:mt-0 
                            [@media_(min-width:_1800px)]:w-[42%] [@media_(min-width:_1800px)]:h-[850px]
                            [@media_(min-width:_2200px)]:w-[43%] [@media_(min-width:_2200px)]:h-[920px]
                            [@media_(min-width:_3840px)]:w-[45%] [@media_(min-width:_3840px)]:h-[1140px]">
              <p className="text-[#4B2C5E] font-feature-dlig font-georgia text-[24px] 
                            2xl:text-[30px] 
                            [@media_(min-width:_1800px)]:text-[clamp(30px,_2vw,_33px)]
                            [@media_(min-width:_2200px)]:text-[clamp(33px,_1.8vw,_35px)]
                            [@media_(min-width:_2560px)]:text-[36px] 
                            [@media_(min-width:_3840px)]:text-[46px] 
                            italic font-normal leading-10 2xl:leading-[3rem] 
                            [@media_(min-width:_1800px)]:leading-[3.2rem]
                            [@media_(min-width:_2200px)]:leading-[3.3rem]
                            [@media_(min-width:_2560px)]:leading-[3.5rem] 
                            [@media_(min-width:_3840px)]:leading-[4rem] 
                            w-[679px] 2xl:w-[815px] 
                            [@media_(min-width:_1800px)]:w-[870px]
                            [@media_(min-width:_2200px)]:w-[920px]
                            [@media_(min-width:_2560px)]:w-[980px] 
                            [@media_(min-width:_3840px)]:w-[1220px] 
                            text-left h-[100px] 2xl:h-[120px] 
                            [@media_(min-width:_1800px)]:h-[130px]
                            [@media_(min-width:_2200px)]:h-[135px]
                            [@media_(min-width:_2560px)]:h-[140px] 
                            [@media_(min-width:_3840px)]:h-[180px]">
                <em>Your journey to justice starts here.</em>
              </p>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                id="lead-form"
                className="space-y-6 2xl:space-y-8 
                          [@media_(min-width:_1800px)]:space-y-9
                          [@media_(min-width:_2200px)]:space-y-9.5
                          [@media_(min-width:_2560px)]:space-y-10 
                          [@media_(min-width:_3840px)]:space-y-12"
                data-tf-element-role="offer"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 2xl:gap-10 
                                [@media_(min-width:_1800px)]:gap-11
                                [@media_(min-width:_2200px)]:gap-11.5
                                [@media_(min-width:_2560px)]:gap-12 
                                [@media_(min-width:_3840px)]:gap-16">
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
                      sx={{
                        ...textFieldStyle,
                        '& .MuiInputLabel-root': {
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' }
                        },
                        '& .MuiInput-input': {
                          fontSize: 'clamp(14px, 2vw, 20px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                          '@media (min-width: 2560px)': { fontSize: '24px' },
                          '@media (min-width: 3840px)': { fontSize: '28px' }
                        }
                      }}
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
                      sx={{
                        ...textFieldStyle,
                        '& .MuiInputLabel-root': {
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' }
                        },
                        '& .MuiInput-input': {
                          fontSize: 'clamp(14px, 2vw, 20px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                          '@media (min-width: 2560px)': { fontSize: '24px' },
                          '@media (min-width: 3840px)': { fontSize: '28px' }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 2xl:gap-10 
                                [@media_(min-width:_1800px)]:gap-11
                                [@media_(min-width:_2200px)]:gap-11.5
                                [@media_(min-width:_2560px)]:gap-12 
                                [@media_(min-width:_3840px)]:gap-16">
                  <div className="w-full md:flex-1">
                    <TextField
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number *"
                      variant="standard"
                      type="tel"
                      fullWidth
                      value={formatPhoneNumber(formData.phoneNumber)}
                      onChange={handleChange}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                      placeholder="+1 XXX-XXX-XXXX"
                      sx={{
                        ...textFieldStyle,
                        '& .MuiInputLabel-root': {
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' }
                        },
                        '& .MuiInput-input': {
                          fontSize: 'clamp(14px, 2vw, 20px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                          '@media (min-width: 2560px)': { fontSize: '24px' },
                          '@media (min-width: 3840px)': { fontSize: '28px' }
                        }
                      }}
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
                      sx={{
                        ...textFieldStyle,
                        '& .MuiInputLabel-root': {
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' }
                        },
                        '& .MuiInput-input': {
                          fontSize: 'clamp(14px, 2vw, 20px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                          '@media (min-width: 2560px)': { fontSize: '24px' },
                          '@media (min-width: 3840px)': { fontSize: '28px' }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 2xl:gap-10 
                                [@media_(min-width:_1800px)]:gap-11
                                [@media_(min-width:_2200px)]:gap-11.5
                                [@media_(min-width:_2560px)]:gap-12 
                                [@media_(min-width:_3840px)]:gap-16">
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
                        max: new Date(
                          new Date().setFullYear(new Date().getFullYear() - 18)
                        )
                          .toISOString()
                          .split("T")[0],
                      }}
                      sx={{
                        ...textFieldStyle,
                        '& .MuiInputLabel-root': {
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' }
                        },
                        '& .MuiInput-input': {
                          fontSize: 'clamp(14px, 2vw, 20px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                          '@media (min-width: 2560px)': { fontSize: '24px' },
                          '@media (min-width: 3840px)': { fontSize: '28px' }
                        }
                      }}
                    />
                  </div>
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
                        max: new Date().toISOString().split("T")[0],
                      }}
                      sx={{
                        ...textFieldStyle,
                        "& .MuiInput-input": {
                          cursor: "pointer",
                          fontSize: 'clamp(14px, 2vw, 20px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                          '@media (min-width: 2560px)': { fontSize: '24px' },
                          '@media (min-width: 3840px)': { fontSize: '28px' }
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 2xl:gap-10 
                                [@media_(min-width:_1800px)]:gap-11
                                [@media_(min-width:_2200px)]:gap-11.5
                                [@media_(min-width:_2560px)]:gap-12 
                                [@media_(min-width:_3840px)]:gap-16">
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
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' },
                          fontFamily: "Helvetica",
                          "&.Mui-focused": {
                            color: "#4b2c5e",
                          },
                        }}
                      >
                        <b>Type of Diagnosis *</b>
                      </InputLabel>
                      <Select
                        labelId="diagnosis-type-label"
                        id="diagnosisType"
                        name="diagnosisType"
                        value={formData.diagnosisType}
                        label="Type of Diagnosis *"
                        onChange={handleChange}
                        sx={{
                          ...selectFieldStyle,
                          '& .MuiSelect-select': {
                            fontSize: 'clamp(14px, 2vw, 20px)',
                            '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                            '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                            '@media (min-width: 2560px)': { fontSize: '24px' },
                            '@media (min-width: 3840px)': { fontSize: '28px' }
                          }
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              "& .MuiMenuItem-root": {
                                ...menuItemStyle,
                                fontSize: 'clamp(14px, 2vw, 20px)',
                                '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                                '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                                '@media (min-width: 2560px)': { fontSize: '24px' },
                                '@media (min-width: 3840px)': { fontSize: '28px' }
                              }
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
                        <FormHelperText sx={{
                          fontSize: 'clamp(12px, 1.5vw, 16px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(16px, 1vw, 18px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(18px, 0.9vw, 19px)' },
                          '@media (min-width: 2560px)': { fontSize: '20px' },
                          '@media (min-width: 3840px)': { fontSize: '24px' }
                        }}>{errors.diagnosisType}</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="w-full md:flex-1">
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
                      sx={{
                        ...textFieldStyle,
                        '& .MuiInputLabel-root': {
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' }
                        },
                        '& .MuiInput-input': {
                          fontSize: 'clamp(14px, 2vw, 20px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                          '@media (min-width: 2560px)': { fontSize: '24px' },
                          '@media (min-width: 3840px)': { fontSize: '28px' }
                        }
                      }}
                    />
                  </div>
                </div>

                {formData.diagnosisType === "other" && (
                  <div>
                    <TextField
                      id="otherDiagnosis"
                      name="otherDiagnosis"
                      label="Please specify your diagnosis type *"
                      variant="standard"
                      fullWidth
                      value={formData.otherDiagnosis}
                      onChange={handleChange}
                      error={!!errors.otherDiagnosis}
                      helperText={errors.otherDiagnosis}
                      sx={{
                        ...textFieldStyle,
                        '& .MuiInputLabel-root': {
                          fontSize: 'clamp(16px, 2.5vw, 24px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(24px, 1.5vw, 26px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(26px, 1.3vw, 27px)' },
                          '@media (min-width: 2560px)': { fontSize: '28px' },
                          '@media (min-width: 3840px)': { fontSize: '32px' }
                        },
                        '& .MuiInput-input': {
                          fontSize: 'clamp(14px, 2vw, 20px)',
                          '@media (min-width: 1800px)': { fontSize: 'clamp(20px, 1.3vw, 22px)' },
                          '@media (min-width: 2200px)': { fontSize: 'clamp(22px, 1.1vw, 23px)' },
                          '@media (min-width: 2560px)': { fontSize: '24px' },
                          '@media (min-width: 3840px)': { fontSize: '28px' }
                        }
                      }}
                    />
                  </div>
                )}

              <div className="space-y-4 2xl:space-y-6 
                [@media_(min-width:_1800px)]:space-y-7
                [@media_(min-width:_2200px)]:space-y-7.5
                [@media_(min-width:_2560px)]:space-y-8 
                [@media_(min-width:_3840px)]:space-y-10">

  {/* Privacy Policy Checkbox */}
  <div className="flex items-start gap-4 2xl:gap-6 
                  [@media_(min-width:_1800px)]:gap-7
                  [@media_(min-width:_2200px)]:gap-7.5
                  [@media_(min-width:_2560px)]:gap-8 
                  [@media_(min-width:_3840px)]:gap-10">
    <input
      type="checkbox"
      name="privacyPolicy"
      checked={formData.privacyPolicy}
      onChange={handleChange}
      className="mt-1 2xl:mt-2 
                [@media_(min-width:_1800px)]:mt-2.5
                [@media_(min-width:_2200px)]:mt-2.8
                [@media_(min-width:_2560px)]:mt-3 
                [@media_(min-width:_3840px)]:mt-4 
                w-4 h-4 2xl:w-5 2xl:h-5 
                [@media_(min-width:_1800px)]:w-[1.4rem] [@media_(min-width:_1800px)]:h-[1.4rem]
                [@media_(min-width:_2200px)]:w-[1.45rem] [@media_(min-width:_2200px)]:h-[1.45rem]
                [@media_(min-width:_2560px)]:w-6 [@media_(min-width:_2560px)]:h-6 
                [@media_(min-width:_3840px)]:w-7 [@media_(min-width:_3840px)]:h-7"
    />
    <div className="text-xs sm:text-sm 2xl:text-base 
                    [@media_(min-width:_1800px)]:text-[clamp(16px,_1vw,_17px)]
                    [@media_(min-width:_2200px)]:text-[clamp(17px,_0.9vw,_18px)]
                    [@media_(min-width:_2560px)]:text-lg 
                    [@media_(min-width:_3840px)]:text-xl 
                    font-helvetica text-left">
      <span className="block" data-tf-element-role="consent-opt-in">
        I agree to the{" "}
        <a href="/PrivacyPolicy" className="underline hover:text-blue-200">
          privacy policy
        </a>{" "}
        and{" "}
        <a href="/Disclaimer" className="underline hover:text-blue-200">
          disclaimer
        </a>
        &nbsp; and give my express written consent, affiliates
        and/or lawyer to contact you at the number provided above, even if this number is a wireless number or if I am presently listed on a Do Not Call list. I understand that I may be contacted by telephone, email, text message or mail regarding case options and that I may be called using automatic dialing equipment. Message and data rates may apply. My consent does not require purchase. This is Legal advertising.
      </span>
    </div>
  </div>
  {errors.privacyPolicy && (
    <div className="text-red-500 text-sm 2xl:text-base 
                    [@media_(min-width:_1800px)]:text-[clamp(16px,_1vw,_17px)]
                    [@media_(min-width:_2200px)]:text-[clamp(17px,_0.9vw,_18px)]
                    [@media_(min-width:_2560px)]:text-lg 
                    [@media_(min-width:_3840px)]:text-xl">
      {errors.privacyPolicy}
    </div>
  )}

  {/* Human Verification Checkbox */}
  <div className="flex items-start gap-4 2xl:gap-6 
                  [@media_(min-width:_1800px)]:gap-7
                  [@media_(min-width:_2200px)]:gap-7.5
                  [@media_(min-width:_2560px)]:gap-8 
                  [@media_(min-width:_3840px)]:gap-10 
                  font-helvetica">
    <input
      type="checkbox"
      name="humanVerification"
      checked={formData.humanVerification}
      onChange={handleChange}
      data-tf-element-role="consent-opt-in"
      className="mt-1 2xl:mt-2 
                [@media_(min-width:_1800px)]:mt-2.5
                [@media_(min-width:_2200px)]:mt-2.8
                [@media_(min-width:_2560px)]:mt-3 
                [@media_(min-width:_3840px)]:mt-4 
                w-4 h-4 2xl:w-5 2xl:h-5 
                [@media_(min-width:_1800px)]:w-[1.4rem] [@media_(min-width:_1800px)]:h-[1.4rem]
                [@media_(min-width:_2200px)]:w-[1.45rem] [@media_(min-width:_2200px)]:h-[1.45rem]
                [@media_(min-width:_2560px)]:w-6 [@media_(min-width:_2560px)]:h-6 
                [@media_(min-width:_3840px)]:w-7 [@media_(min-width:_3840px)]:h-7"
    />
    <div className="text-xs sm:text-sm 2xl:text-base 
                    [@media_(min-width:_1800px)]:text-[clamp(16px,_1vw,_17px)]
                    [@media_(min-width:_2200px)]:text-[clamp(17px,_0.9vw,_18px)]
                    [@media_(min-width:_2560px)]:text-lg 
                    [@media_(min-width:_3840px)]:text-xl">
      Please check this box to verify you're a person.
    </div>
  </div>
  {errors.humanVerification && (
    <div className="text-red-500 text-sm 2xl:text-base 
                    [@media_(min-width:_1800px)]:text-[clamp(16px,_1vw,_17px)]
                    [@media_(min-width:_2200px)]:text-[clamp(17px,_0.9vw,_18px)]
                    [@media_(min-width:_2560px)]:text-lg 
                    [@media_(min-width:_3840px)]:text-xl">
      {errors.humanVerification}
    </div>
  )}
</div>


                {formData.humanVerification && (
                            <CustomCaptcha
            onCaptchaChange={handleCaptchaChange}
            resetTrigger={captchaResetTrigger}
            disabled={isSubmitting}
          />
                )}

                <div className="text-left sm:text-left">
                  <button
                    type="submit" 
                    disabled={isSubmitting}
                    data-tf-element-role="consent-opt-in"
                    className={`rounded-[10px] 2xl:rounded-[15px] 
                               [@media_(min-width:_1800px)]:rounded-[16px]
                               [@media_(min-width:_2200px)]:rounded-[17px]
                               [@media_(min-width:_2560px)]:rounded-[18px] 
                               [@media_(min-width:_3840px)]:rounded-[22px] 
                               bg-[#4b2c5e] text-[#f8f2e9] 
                               px-8 sm:px-12 2xl:px-16 
                               [@media_(min-width:_1800px)]:px-[4.5rem]
                               [@media_(min-width:_2200px)]:px-[4.8rem]
                               [@media_(min-width:_2560px)]:px-20 
                               [@media_(min-width:_3840px)]:px-24 
                               py-3 sm:py-4 2xl:py-6 
                               [@media_(min-width:_1800px)]:py-7
                               [@media_(min-width:_2200px)]:py-7.5
                               [@media_(min-width:_2560px)]:py-8 
                               [@media_(min-width:_3840px)]:py-10 
                               font-bold transition-colors 
                               text-sm sm:text-base md:text-lg 2xl:text-xl 
                               [@media_(min-width:_1800px)]:text-[clamp(20px,_1.3vw,_22px)]
                               [@media_(min-width:_2200px)]:text-[clamp(22px,_1.1vw,_23px)]
                               [@media_(min-width:_2560px)]:text-2xl 
                               [@media_(min-width:_3840px)]:text-3xl 
                               flex items-center justify-center gap-2 2xl:gap-3 
                               [@media_(min-width:_1800px)]:gap-3.5
                               [@media_(min-width:_2200px)]:gap-3.8
                               [@media_(min-width:_2560px)]:gap-4 
                               [@media_(min-width:_3840px)]:gap-5 ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#3a2249]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress size={20} color="inherit" className="2xl:!w-6 2xl:!h-6 
                                         [@media_(min-width:_1800px)]:!w-7 [@media_(min-width:_1800px)]:!h-7
                                         [@media_(min-width:_2200px)]:!w-[1.8rem] [@media_(min-width:_2200px)]:!h-[1.8rem]
                                         [@media_(min-width:_2560px)]:!w-8 [@media_(min-width:_2560px)]:!h-8 
                                         [@media_(min-width:_3840px)]:!w-10 [@media_(min-width:_3840px)]:!h-10" />
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
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden bg-[#FAF3EC] font-georgia p-5">
        {/* Images at the top */}
        <div className="flex flex-col items-center">
          {/* Replace with your actual image imports */}
          <img
            src={Vector2}
            alt="Senior Couple"
            className="w-[70%] max-w-[280px] mt-8"
          />
          <img
            src={Vector1}
            alt="Family"
            className="w-[60%] max-w-[200px] mt-4 hidden md:block"
          />
        </div>

        {/* Text content below images */}
        <div className="mt-8 text-center">
          <h1 className="text-[#4B2C5E] text-4xl italic font-georgia">
            <span>At 70,</span>
            <br />
            <span className="text-[#4B2C5E]/60">Every Day Matters</span>
          </h1>
          <p className="text-[#4B2C5E] font-helvetica text-lg mt-6 px-4 text-center">
            You're a parent, a partner, a friend-and you deserve more than care.
            You deserve compassion, presence, and someone who walks beside you
            every step of the way.
          </p>
        </div>

        {/* Form container - centered below text with Material UI components */}
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
            <div className="flex flex-col gap-6">
              <TextField
                id="firstName-mobile"
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
              
              <TextField
                id="lastName-mobile"
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

            <div className="flex flex-col gap-6">
              <TextField
                id="phoneNumber-mobile"
                name="phoneNumber"
                label="Phone Number *"
                variant="standard"
                type="tel"
                fullWidth
                value={formatPhoneNumber(formData.phoneNumber)}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                placeholder="+1 XXX-XXX-XXXX"
                sx={textFieldStyle}
              />
              
              <TextField
                id="emailId-mobile"
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

            <div className="flex flex-col gap-6">
              <TextField
                id="dateOfBirth-mobile"
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
                  max: new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  )
                    .toISOString()
                    .split("T")[0],
                }}
                sx={textFieldStyle}
              />
              
              <TextField
                id="dateOfDiagnosis-mobile"
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
                  max: new Date().toISOString().split("T")[0],
                }}
                sx={{
                  ...textFieldStyle,
                  "& .MuiInput-input": {
                    cursor: "pointer",
                  },
                }}
              />
            </div>

            <div className="flex flex-col gap-6">
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
                    "&.Mui-focused": {
                      color: "#4b2c5e",
                    },
                  }}
                >
                  <b>Type of Diagnosis *</b>
                </InputLabel>
                <Select
                  labelId="diagnosis-type-label-mobile"
                  id="diagnosisType-mobile"
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
              
              <TextField
                id="jobTitle-mobile"
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

            {formData.diagnosisType === "other" && (
              <div>
                <TextField
                  id="otherDiagnosis-mobile"
                  name="otherDiagnosis"
                  label="Please specify your diagnosis type *"
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
                    <a href="/PrivacyPolicy" className="underline hover:text-blue-200">
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a href="/Disclaimer" className="underline hover:text-blue-200">
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
            </div>

            {formData.humanVerification && (
                        <CustomCaptcha
            onCaptchaChange={handleCaptchaChange}
            resetTrigger={captchaResetTrigger}
            disabled={isSubmitting}
          />
            )}

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

export default Hometwo;