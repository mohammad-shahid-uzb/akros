// services/authService.js
import axios from "axios";

// Set the base URL of your backend API for authentication
// const API_URL = "https://thawing-dawn-57923-5ea49e28bc3c.herokuapp.com/api";
//const API_URL = "http://localhost:5000/api";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;
console.log("API_URL Google", API_URL);
// Send the Google token to the backend for verification and user creation/login
export const verifyGoogleToken = async (token) => {
  try {
    console.log("token services", token);
    const response = await axios.post(`${API_URL}/glogin`, { token });
    console.log("response services", response.data);
    return response.data;
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw error;
  }
};
