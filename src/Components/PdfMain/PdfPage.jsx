import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GoDownload } from "react-icons/go";
import down from "../../assets/Group 1000009530.png"
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import RoadSafetyGuideClaim4Accidents from "../../assets/Fighting_Mesothelioma.pdf";
import LaborDayGuidePreview from "../../assets/Ebook_2.pdf";
import { sendAdminEmail, sendUserEmail } from "./emailjsservice";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
document.head.appendChild(link);
const CustomCaptcha = ({ onCaptchaChange, resetTrigger }) => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [charOffsets, setCharOffsets] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const generateCaptcha = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    let offsets = [];
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
      offsets.push((Math.random() * 10 - 5).toFixed(2));
    }
    setCaptchaText(result);
    setCharOffsets(offsets);
    setUserInput("");
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
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);

      const voices = window.speechSynthesis.getVoices();
      const maleUsVoice =
        voices.find(
          (voice) =>
            voice.lang === "en-US" && voice.name.toLowerCase().includes("david")
        ) || voices.find((voice) => voice.lang === "en-US");

      let currentIndex = 0;
      const speakNextChar = () => {
        if (currentIndex < captchaText.length) {
          const char = captchaText[currentIndex];
          const utterance = new SpeechSynthesisUtterance(char);
          utterance.rate = 0.5;
          utterance.pitch = 0.9;
          utterance.volume = 1.0;
          utterance.lang = "en-US";

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
              backgroundSize: "100% 10px",
              backgroundPosition: "0 50%",
            }}
          />
          <div className="relative z-10">
            {captchaText.split("").map((char, index) => (
              <span
                key={index}
                style={{
                  transform: `translateY(${parseFloat(
                    charOffsets[index] || 0
                  )}px)`,
                  display: "inline-block",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
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
              className={`px-3 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0 ${isSpeaking ? "opacity-50 cursor-not-allowed" : ""
                }`}
              title="Listen to CAPTCHA"
              aria-label="Listen to CAPTCHA"
            >
              {isSpeaking ? "🔊🎵" : "🔊"}
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
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${userInput !== "" && !isValid
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
            }`}
        />
        {userInput !== "" && !isValid && (
          <p className="text-red-500 text-sm mt-1">CAPTCHA does not match</p>
        )}
        {isValid && (
          <p className="text-green-500 text-sm mt-1">
            CAPTCHA verified successfully
          </p>
        )}
      </div>
    </div>
  );
};
const FloatingInput = ({ type, id, label, value, onChange, error }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => setFocused(e.target.value !== "" || focused)}
        className={`peer w-full border ${error ? "border-red-500" : "border-gray-300"
          } rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-blue-400"
          } bg-[#FFFF] text-[#000] font-medium`}
        style={{ fontFamily: "Quicksand, sans-serif" }}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-2 text-sm ${error ? "text-red-600" : "text-gray-600"
          } transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-600`}
        style={{ fontFamily: "Quicksand, sans-serif" }}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
export default function PdfPage() {
  const [agreed, setAgreed] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    consent: false,
    humanVerification: false,
  });
  const [errors, setErrors] = useState({});

  // CAPTCHA related states
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaResetTrigger, setCaptchaResetTrigger] = useState(0);

  // Enhanced useEffect for TrustedForm monitoring
  useEffect(() => {
    let observer;
    let timeoutId;

    const initializeTrustedForm = () => {
      console.log("start");
      // Check for initial values
      const checkInitialValues = () => {
        const certUrlField = document.querySelector(
          'input[name="xxTrustedFormCertUrl"]'
        );
        const tokenField = document.querySelector(
          'input[name="xxTrustedFormCertToken"]'
        );
        const pingUrlField = document.querySelector(
          'input[name="xxTrustedFormPingUrl"]'
        );

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
            const certUrlField = document.querySelector(
              'input[name="xxTrustedFormCertUrl"]'
            );
            const tokenField = document.querySelector(
              'input[name="xxTrustedFormCertToken"]'
            );
            const pingUrlField = document.querySelector(
              'input[name="xxTrustedFormPingUrl"]'
            );

            const certUrlValue = certUrlField?.value || "";
            const tokenValue = tokenField?.value || "";
            const pingUrlValue = pingUrlField?.value || "";

            // Update state with the correct values
            setCertId(certUrlValue);
            setPingUrl(pingUrlValue);
            setTokenUrl(tokenValue);

            // console.log("TrustedForm field update:", {
            //   fieldName,
            //   certId: certUrlValue,
            //   pingUrl: pingUrlValue,
            //   tokenUrl: tokenValue
            // });

            // Fetch cert data if we have a cert URL and it's the cert field that changed
            if (certUrlValue && fieldName === "xxTrustedFormCertUrl") {
              fetchCertData(certUrlValue);
            }
          }
        });
      });

      // Observe all TrustedForm fields for changes
      const fieldsToObserve = [
        "xxTrustedFormCertUrl",
        "xxTrustedFormCertToken",
        "xxTrustedFormPingUrl",
      ];

      fieldsToObserve.forEach((fieldName) => {
        const field = document.querySelector(`input[name="${fieldName}"]`);
        if (field) {
          observer.observe(field, { attributes: true });
          // console.log(`Observing field: ${fieldName}`);
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
      // console.log("TrustedForm Cert Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching TrustedForm cert:", error);
      return null;
    }
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

  const PDF_URL = RoadSafetyGuideClaim4Accidents;
  const PREVIEW_PDF_URL = LaborDayGuidePreview;

  // Function to format phone number
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");

    // Limit to 10 digits
    if (phoneNumber.length > 10) return formData.phone;

    // Format the number
    if (phoneNumber.length === 0) return "";
    if (phoneNumber.length <= 3) return `(${phoneNumber}`;
    if (phoneNumber.length <= 6)
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6)}`;
  };

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  // Function to check if email contains @ symbol
  const hasAtSymbol = (email) => {
    return email.includes("@");
  };

  // Function to validate phone number
  const validatePhone = (phone) => {
    const phoneDigits = phone.replace(/\D/g, "");
    return phoneDigits.length === 10;
  };

  // Function to validate full name
  const validateFullName = (name) => {
    return name.trim().length >= 2 && name.trim().includes(" ");
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    // Prevent numbers in full name field
    if (field === "fullName") {
      value = value.replace(/[0-9]/g, "");
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Real-time email validation
    if (field === "email" && value) {
      if (!hasAtSymbol(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Email must contain @ symbol",
        }));
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  // Handle human verification checkbox change
  const handleHumanVerificationChange = (checked) => {
    setIsHuman(checked);
    setFormData((prev) => ({ ...prev, humanVerification: checked }));

    // Reset CAPTCHA when humanVerification is unchecked
    if (!checked) {
      setCaptchaValue("");
      setCaptchaResetTrigger((prev) => prev + 1);
      if (errors.captcha) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          captcha: "",
        }));
      }
      if (errors.humanVerification) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          humanVerification: "",
        }));
      }
    }
  };

  // Update consent handling
  useEffect(() => {
    setFormData((prev) => ({ ...prev, consent: agreed }));
  }, [agreed]);

  // Handle phone number change with formatting
  const handlePhoneNumberChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    handleInputChange("phone", formattedNumber);
  };

  // Function to download the existing PDF
  const downloadExistingPDF = (userData) => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = PDF_URL;
    link.download = `RoadSafetyGuideClaim4Accidents-${userData.fullName.replace(
      /\s+/g,
      "-"
    )}.pdf`;

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check if form can be submitted
  const canSubmit = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      agreed &&
      isHuman &&
      captchaValue &&
      !isSubmitting
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(" Form submission started");

    const newErrors = {};

    // --- Basic Validation ---
    if (
      !formData.fullName ||
      formData.fullName.trim().length < 2 ||
      !formData.fullName.includes(" ")
    ) {
      newErrors.fullName = "Please enter your full name (first and last name)";
    }

    if (
      !formData.email ||
      !formData.email.includes("@") ||
      !validateEmail(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone || formData.phone.replace(/\D/g, "").length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!agreed) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    if (!isHuman) {
      newErrors.humanVerification = "Please verify that you are human";
    }

    if (isHuman && !captchaValue) {
      newErrors.captcha = "Please complete the CAPTCHA verification";
    }

    // --- Stop if validation failed ---
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    setIsSubmitting(true);

    try {
      // --- Merge final data ---
      const updatedFormData = {
        ...formData,
        consent: agreed,
        certId,
        pingUrl,
        tokenUrl,
      };

      // Download PDF before emails
      downloadExistingPDF(updatedFormData);

      // Send emails
      await sendAdminEmail(updatedFormData);
      await sendUserEmail(updatedFormData);

      toast.success(
        "✅ Thank you! Your safety guide has been downloaded. We'll contact you soon."
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        consent: false,
        humanVerification: false,
      });
      setAgreed(false);
      setIsHuman(false);
      setCaptchaValue("");
      setCaptchaResetTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("💥 Error in form submission:", error);

      toast.error(
        "⚠️ Your guide was downloaded, but there was an issue sending your info. Please reach out directly."
      );

      // Reset form anyway
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        consent: false,
        humanVerification: false,
      });
      setAgreed(false);
      setIsHuman(false);
      setCaptchaValue("");
      setCaptchaResetTrigger((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" />

      <main
        className="relative min-h-screen text-gray-800 font-sans"
        aria-label="Information and signup page"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundColor: "#FAF3EC" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          aria-hidden="true"
        />

        {/* Content - Enhanced for large screens */}
        <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 2xl:pt-24">
          <section className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] grid-cols-1 gap-6 sm:gap-8 px-4 pb-8 sm:pb-12 pt-2 lg:grid-cols-2 lg:gap-12 2xl:gap-16 3xl:gap-20 md:px-8 2xl:px-12 3xl:px-16 lg:py-8 2xl:py-12">
            {/* Left: Headings + PDF Preview CTA - Enhanced spacing for large screens */}
            <div className="flex flex-col justify-center gap-4 sm:gap-6 2xl:gap-8 3xl:gap-10 transition-all duration-700 ease-in-out 2xl:pr-8 3xl:pr-12">
<h1
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl italic font-normal leading-tight sm:leading-tight md:leading-tight 2xl:leading-tight 3xl:leading-tight"
  style={{
    fontFamily: "Georgia, serif",
    color: "#4B2C5E",
    fontFeatureSettings: "'dlig' on",
  }}
>
  Standing with Families Affected by Mesothelioma
</h1>


              <p
                className="font-normal leading-relaxed transition-all duration-500 ease-in-out text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl 2xl:leading-relaxed 3xl:leading-relaxed"
                style={{
                  fontFeatureSettings: "'dlig' on",
                  fontFamily: "Helvetica, sans-serif",
                  fontWeight: 400,
                  color: "#4B2C5E",
                }}
              >
                We connect individuals and families impacted by mesothelioma or
                asbestos exposure with the{" "}
                <span className="font-bold">
                  nation's most trusted legal services,{" "}
                </span>{" "}
                ensuring you secure the{" "}
                <span className="font-bold">
                  {" "}
                  justice and support you rightfully deserve.
                </span>
              </p>

              {/* Button container - Enhanced for large screens */}
              <div className="mt-2 2xl:mt-4">
                <button
                  onClick={() => setShowModal(true)}
                  aria-label="Preview the PDF"
                  className="inline-block font-rethink px-6 py-2 2xl:px-8 2xl:py-3 3xl:px-10 3xl:py-4 text-sm sm:text-base 2xl:text-lg 3xl:text-xl font-semibold text-white rounded-lg 2xl:rounded-lg transition-all duration-300 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 2xl:hover:scale-105"
                  style={{ backgroundColor: "#2E4A7D" }}
                >
                  Preview the PDF
                </button>
              </div>
            </div>

            {/* Right: Form - Enhanced for large screens */}
            <div className="flex transition-all duration-700 ease-in-out">
              <div
                className="w-full rounded-xl sm:rounded-2xl 2xl:rounded-3xl border bg-white p-4 sm:p-6 md:p-8 2xl:p-10 3xl:p-12 "
                role="region"
                aria-label="Request form"
              >
                <h2
                  className="mb-3 2xl:mb-5 3xl:mb-6 transition-all duration-300 ease-in-out text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold leading-tight 2xl:leading-tight"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#2E4A7D",
                    fontFeatureSettings: "'dlig' on",
                  }}
                >
                  Get Your Free Safety Guide
                </h2>

                <form className="space-y-4 sm:space-y-6 2xl:space-y-7 3xl:space-y-8">
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

                  <div className="transition-all duration-300 ease-in-out">
                    <FloatingInput
                      id="fullName"
                      type="text"
                      label="Full name *"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      error={errors.fullName}
                    />
                  </div>


                  <div className="transition-all duration-300 ease-in-out">
                    <FloatingInput
                      id="phone"
                      type="tel"
                      label="Phone number *"
                      value={formData.phone}
                      onChange={handlePhoneNumberChange}
                      error={errors.phone}
                    />
                  </div>

                  <div className="transition-all duration-300 ease-in-out">
                    <FloatingInput
                      id="email"
                      type="email"
                      label="Email *"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      error={errors.email}
                    />
                  </div>
                  <div className="transition-all duration-300 ease-in-out space-y-4">
                    {/* Consent checkbox */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="flex-shrink-0 mt-0.5 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all duration-300"
                        style={{ accentColor: "#2E4A7D" }}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-700 leading-relaxed font-rethink"
                      >
                        I agree to the{" "}
                        <a
                          href="/PrivacyPolicy"
                          className="text-blue-600 underline hover:text-blue-800"
                          style={{ color: "#2E4A7D" }}
                        >
                          Privacy Policy
                        </a>{" "}
                        &{" "}
                        <a
                          href="/Disclaimer"
                          className="text-blue-600 underline hover:text-blue-800"
                          style={{ color: "#2E4A7D" }}
                        >
                          Disclaimer
                        </a>{" "}
                        & give my express written consent, affiliates & /or
                        lawyer to contact you at the number provided above, even
                        if this number is a wireless number or if I am presently
                        listed on a Do Not Call list. I understand that I may be
                        contacted by telephone, email, text message or mail
                        regarding case options & that I may be called using
                        automatic dialing equipment. Message & data rates may
                        apply. My consent does not require purchase. This is
                        Legal advertising.
                      </label>
                    </div>
                    {/* Verify Human checkbox */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="verify-human"
                        checked={isHuman}
                        onChange={(e) =>
                          handleHumanVerificationChange(e.target.checked)
                        }
                        className="flex-shrink-0 mt-0.5 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all duration-300"
                        style={{ accentColor: "#2E4A7D" }}
                      />
                      <label
                        htmlFor="verify-human"
                        className="text-sm text-gray-700 leading-relaxed font-rethink"
                      >
                        Verify you are human
                      </label>
                    </div>
                    {errors.humanVerification && (
                      <p className="text-sm text-red-600">
                        {errors.humanVerification}
                      </p>
                    )}
                    {/* CAPTCHA Component */}
                    {isHuman && (
                      <div className="mt-3">
                        <CustomCaptcha
                          onCaptchaChange={handleCaptchaChange}
                          resetTrigger={captchaResetTrigger}
                        />
                        {errors.captcha && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.captcha}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {status && (
                    <div
                      role="status"
                      className={`px-3 sm:px-4 2xl:px-5 py-2 sm:py-3 2xl:py-4 rounded-xl 2xl:rounded-2xl transition-all duration-300 ease-in-out ${status.type === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                      style={{ animation: "slideIn 0.5s ease-out" }}
                    >
                      <p className="text-xs sm:text-sm 2xl:text-base">
                        {status.message}
                      </p>
                    </div>
                  )}

                 {/* Submit Button - Enhanced for large screens */}
<div className="pt-2 sm:pt-3 2xl:pt-4 transition-all duration-300 ease-in-out">
  <button
    type="submit"
    disabled={!canSubmit()}
    onClick={handleSubmit}
    className={`font-rethink w-full h-12 sm:h-14 md:h-16 2xl:h-18 3xl:h-20 
                text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl 
                font-semibold text-white rounded-lg 
                transition-all duration-300 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${canSubmit()
                  ? "focus:ring-blue-500 active:translate-y-0 shadow-md"
                  : "cursor-not-allowed opacity-75"
                }`}
    style={{ backgroundColor: "#2E4A7D" }}
    aria-label="Download PDF"
  >
    {isSubmitting ? (
      "Submitting..."
    ) : (
      <span className="inline-flex items-center gap-2">
        <img 
          src={down} 
          alt="Download Icon" 
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
        />
        Download pdf Now
      </span>
    )}
  </button>

  {/* Submission status indicator */}
  {isSubmitting && (
    <p
      className="text-center mt-2 2xl:mt-3 text-xs sm:text-sm 2xl:text-base font-medium"
      style={{ color: "#2E4A7D" }}
    >
      Processing your request...
    </p>
  )}
</div>

                </form>
              </div>
            </div>
          </section>
        </div>

{/* Modal - Enhanced for large screens */}
{showModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
    <div
      className="bg-white rounded-xl sm:rounded-2xl 2xl:rounded-3xl shadow-2xl w-full max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl max-h-[95vh] sm:max-h-[90vh] 2xl:max-h-[85vh] flex flex-col transition-all duration-300 ease-in-out"
      style={{ animation: "slideIn 0.3s ease-out" }}
    >
      {/* Modal Header */}
      <div className="px-4 sm:px-6 2xl:px-8 py-3 sm:py-4 2xl:py-6 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-lg sm:text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-900">
          Benefits Guide (Preview)
        </h3>
        <p className="text-xs sm:text-sm 2xl:text-base text-gray-600 mt-1 2xl:mt-2">
          Scroll to read. You can also open the PDF in a new tab for larger
          controls.
        </p>
      </div>

      {/* Modal Content (iframe scrollable only) */}
      <div className="flex-1 px-4 sm:px-6 2xl:px-8 py-3 sm:py-4 2xl:py-6 overflow-hidden">
        <div className="border border-gray-200 rounded-lg 2xl:rounded-xl overflow-hidden bg-gray-50 h-full">
          <iframe
            src={PREVIEW_PDF_URL}
            title="Benefits Guide PDF"
            className="w-full h-full border-0"
            style={{ minHeight: "300px", maxHeight: "60vh" }}
            aria-label="Benefits Guide PDF preview"
          />
        </div>
      </div>

    {/* Modal - Enhanced for large screens */}
{showModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
    <div
      className="bg-white rounded-xl sm:rounded-2xl 2xl:rounded-3xl shadow-2xl w-full max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl max-h-[95vh] sm:max-h-[90vh] 2xl:max-h-[85vh] flex flex-col transition-all duration-300 ease-in-out"
      style={{ animation: "slideIn 0.3s ease-out" }}
    >
      {/* Modal Header - compact */}
      <div className="px-4 sm:px-5 2xl:px-6 py-2 sm:py-3 2xl:py-4 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-base sm:text-lg 2xl:text-xl font-semibold text-gray-900">
          Benefits Guide (Preview)
        </h3>
        <p className="text-[10px] sm:text-xs 2xl:text-sm text-gray-600 mt-0.5 sm:mt-1">
          Scroll to read. You can also open the PDF in a new tab for larger
          controls.
        </p>
      </div>

      {/* Modal Content (iframe scrollable only) */}
      <div className="flex-1 px-4 sm:px-5 2xl:px-6 py-3 sm:py-4 2xl:py-5 overflow-hidden">
        <div className="border border-gray-200 rounded-lg 2xl:rounded-xl overflow-hidden bg-gray-50 h-full">
          <iframe
            src={PREVIEW_PDF_URL}
            title="Benefits Guide PDF"
            className="w-full h-full border-0"
            style={{ minHeight: "300px", maxHeight: "60vh" }}
            aria-label="Benefits Guide PDF preview"
          />
        </div>
      </div>

    {/* Modal Footer (always vertical stack) */}
<div
  className="px-4 sm:px-5 2xl:px-6 py-3 sm:py-4 2xl:py-5 
             border-t border-gray-200 
             flex flex-col items-end gap-2 
             flex-shrink-0 bg-white"
>
  <a
    href={PREVIEW_PDF_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="no-underline px-4 2xl:px-6 py-2 
               text-sm sm:text-base font-medium text-blue-600 
               rounded-lg transition-all duration-300"
  >
    Open in a new tab
  </a>
  <span
    onClick={() => setShowModal(false)}
    className="cursor-pointer px-4 2xl:px-6 py-2 
               text-sm sm:text-base font-medium text-blue-600 
               rounded-lg transition-all duration-300 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Close
  </span>
</div>


    </div>
  </div>
)}

    </div>
  </div>
)}





        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Custom breakpoints for very large screens */
          @media (min-width: 1920px) {
            .3xl\\:text-8xl {
              font-size: 6rem;
              line-height: 1;
            }
            .3xl\\:text-2xl {
              font-size: 1.5rem;
              line-height: 2rem;
            }
            .3xl\\:text-xl {
              font-size: 1.25rem;
              line-height: 1.75rem;
            }
            .3xl\\:text-lg {
              font-size: 1.125rem;
              line-height: 1.75rem;
            }
            .3xl\\:px-16 {
              padding-left: 4rem;
              padding-right: 4rem;
            }
            .3xl\\:px-12 {
              padding-left: 3rem;
              padding-right: 3rem;
            }
            .3xl\\:px-10 {
              padding-left: 2.5rem;
              padding-right: 2.5rem;
            }
            .3xl\\:px-6 {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            }
            .3xl\\:py-5 {
              padding-top: 1.25rem;
              padding-bottom: 1.25rem;
            }
            .3xl\\:py-4 {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }
            .3xl\\:gap-20 {
              gap: 5rem;
            }
            .3xl\\:gap-10 {
              gap: 2.5rem;
            }
            .3xl\\:gap-8 {
              gap: 2rem;
            }
            .3xl\\:gap-6 {
              gap: 1.5rem;
            }
            .3xl\\:mb-6 {
              margin-bottom: 1.5rem;
            }
            .3xl\\:mt-2 {
              margin-top: 0.5rem;
            }
            .3xl\\:space-y-8 > :not([hidden]) ~ :not([hidden]) {
              margin-top: 2rem;
            }
            .3xl\\:space-y-6 > :not([hidden]) ~ :not([hidden]) {
              margin-top: 1.5rem;
            }
            .3xl\\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
              margin-left: 1rem;
            }
            .3xl\\:h-20 {
              height: 5rem;
            }
            .3xl\\:h-7 {
              height: 1.75rem;
            }
            .3xl\\:w-7 {
              width: 1.75rem;
            }
            .3xl\\:max-w-\\[1800px\\] {
              max-width: 1800px;
            }
            .3xl\\:max-w-7xl {
              max-width: 80rem;
            }
            .3xl\\:min-h-\\[700px\\] {
              min-height: 700px;
            }
            .3xl\\:leading-tight {
              line-height: 1.25;
            }
            .3xl\\:leading-relaxed {
              line-height: 1.625;
            }
          }

          /* Additional 2XL adjustments */
          .2xl\\:h-18 {
            height: 4.5rem;
          }
          .2xl\\:shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(0, 0, 0, 0.05);
          }
          .2xl\\:hover\\:scale-105:hover {
            transform: scale(1.05);
          }
        `}</style>
      </main>
    </>
  );
}
