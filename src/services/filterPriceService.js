// services/filterService.js
import axios from "axios";

const API_URL = "process.env.REACT_APP_BACKEND_URL"; // Replace with your actual endpoint URL

// Fetch filter data
export const fetchFilters = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching filter data:", error);
    throw error;
  }
};
