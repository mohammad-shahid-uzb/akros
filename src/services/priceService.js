// src/services/marketPriceService.js
import axios from "axios";

// Set the base URL of your backend API
//const API_URL = "http://localhost:5000/api/marketPrices";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/marketPrices`;

// Fetch all market prices with optional filters
export const fetchMarketPrices = async (filters = {}) => {
  try {
    // Filter out default or empty values
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([key, value]) => value && value !== "All" && value.trim() !== ""
      )
    );

    // Create a query string from the filtered object
    const queryString = new URLSearchParams(validFilters).toString();

    // Construct the request URL with valid query string
    const requestUrl = `${API_URL}?${queryString}`;

    // Make the GET request to the backend
    const response = await axios.get(requestUrl);

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching market prices:", error.message);
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    } else {
      console.error("No response received. Error:", error);
    }
    throw error;
  }
};

// Fetch a single market price by ID
export const fetchMarketPriceById = async (id) => {
  try {
    console.log("ididid", id);
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching market price with ID ${id}:`, error);
    throw error;
  }
};

// Create a new market price entry
export const createMarketPrice = async (marketPriceData) => {
  try {
    const response = await axios.post(API_URL, marketPriceData, {
      headers: { "Content-Type": "multipart/form-data" }, // Required for file upload
    });
    return response.data;
  } catch (error) {
    console.error("Error creating market price:", error);
    throw error;
  }
};

// Update a market price entry
export const updateMarketPrice = async (id, marketPriceData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, marketPriceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating market price with ID ${id}:`, error);
    throw error;
  }
};

// Delete a market price entry
export const deleteMarketPrice = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting market price with ID ${id}:`, error);
    throw error;
  }
};
