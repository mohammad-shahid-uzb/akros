// /frontend/src/api.js

import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Send phone number to receive SMS verification
export const sendSmsVerification = async (phoneNumber) => {
  try {
    await axios.post(`${API_URL}/sms/verify`, { phoneNumber });
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

// Verify SMS code
export const verifySmsCode = async (phoneNumber, code) => {
  try {
    const response = await axios.post(`${API_URL}/sms/verify/code`, {
      phoneNumber,
      code,
    });
    return response.data; // Return the JWT token
  } catch (error) {
    console.error("Error verifying SMS code:", error);
    throw error;
  }
};

// Telegram login callback
export const loginWithTelegram = async () => {
  try {
    const response = await axios.get(`${API_URL}/telegram/callback`);
    return response.data;
  } catch (error) {
    console.error("Error with Telegram login:", error);
    throw error;
  }
};
