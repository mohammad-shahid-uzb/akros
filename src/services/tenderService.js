// services/tenderService.js
import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/tenders`;

export const fetchTenders = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error("Error fetching tenders:", error);
    throw error;
  }
};

// Fetch a single tender by ID
export const fetchTenderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tender with ID ${id}:`, error);
    throw error;
  }
};

// Create a new tender
export const createTender = async (tenderData) => {
  try {
    const response = await axios.post(API_URL, tenderData);
    return response.data;
  } catch (error) {
    console.error("Error creating tender:", error);
    throw error;
  }
};

// Update a tender
export const updateTender = async (id, tenderData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, tenderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating tender with ID ${id}:`, error);
    throw error;
  }
};

// Delete a tender
export const deleteTender = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting tender with ID ${id}:`, error);
    throw error;
  }
};
