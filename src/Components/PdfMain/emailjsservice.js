import emailjs from "@emailjs/browser";
import React, { useState, useEffect } from "react";

// Initialize EmailJS with your Public Key
emailjs.init("DyDZ85E9uwzwSyUoD");

const SERVICE_ID = "service_9pv809e";
const TEMPLATE_ID_USER = "template_pz4ccfq";
const TEMPLATE_ID_ADMIN = "template_leecgsj";

// Store the initial landing URL
let initialLandingUrl = null;

// Function to get the source URL
const getSourceUrl = () => {
  if (typeof window === "undefined") return "Unknown";

  if (!initialLandingUrl) {
    initialLandingUrl = window.location.href;
  }

  return initialLandingUrl;
};

// Function to get IP address
const getIPAddress = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to get IP address:", error);
    return "IP address not available";
  }
};

// Send user confirmation email
export const sendUserEmail = async (userData) => {
  try {
    const templateParams = {
      user_name: userData.fullName,
      user_email: userData.email,
      user_phone: userData.phone,
      consent_given: userData.consent ? "Yes" : "No",
      submission_time: new Date().toLocaleString(),
      form_type: "Safety Guide Download",
      source_url: getSourceUrl(),
      message:
        "Thank you for downloading our safety guide. We will contact you soon.",
      certId: userData.certId,
      pingUrl: userData.pingUrl,
      tokenUrl: userData.tokenUrl,
    };

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_USER,
      templateParams
    );

    console.log("✅ User email sent:", result);
    return { success: true, result };
  } catch (error) {
    console.error("❌ Failed to send user email:", error);
    return { success: false, error: error.message };
  }
};

// Send admin notification email
export const sendAdminEmail = async (userData) => {
  try {
    const templateParams = {
      user_name: userData.fullName,
      user_email: userData.email,
      user_phone: userData.phone,
      consent_given: userData.consent ? "Yes" : "No",
      submission_time: new Date().toLocaleString(),
      form_type: "Safety Guide Download",
      source_url: getSourceUrl(),
      message:
        "Thank you for downloading our safety guide. We will contact you soon.",
      certId: userData.certId,
      pingUrl: userData.pingUrl,
      tokenUrl: userData.tokenUrl,
    };

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_ADMIN,
      templateParams
    );

    console.log("✅ Admin email sent:", result);
    return { success: true, result };
  } catch (error) {
    console.error("❌ Failed to send admin email:", error);
    return { success: false, error: error.message };
  }
};
