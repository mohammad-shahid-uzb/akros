// services/vendorService.js
import axios from "axios";

//const API_URL = "http://localhost:5000/api/vendors";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/vendors`;
// Fetch all vendors
export const fetchVendors = async () => {
  try {
    // Make a GET request to the API URL
    const response = await axios.get(API_URL);

    // Return the array of vendors (assuming the response is directly an array)
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};

// Fetch a single vendor by ID
export const fetchVendorById = async (id) => {
  try {
    // Make a GET request to fetch a vendor by its ID
    const response = await axios.get(`${API_URL}/${id}`);

    // Return the vendor data from the response
    return response.data;
  } catch (error) {
    console.error(`Error fetching vendor with ID ${id}:`, error);
    throw error;
  }
};

// Create a new vendor
export const createVendor = async (vendorData) => {
  try {
    // Make a POST request to create a new vendor
    const response = await axios.post(API_URL, vendorData);

    // Return the created vendor data from the response
    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error;
  }
};

// Update a vendor by ID
export const updateVendor = async (id, vendorData) => {
  try {
    // Make a PUT request to update a vendor by its ID
    const response = await axios.put(`${API_URL}/${id}`, vendorData);

    // Return the updated vendor data from the response
    return response.data;
  } catch (error) {
    console.error(`Error updating vendor with ID ${id}:`, error);
    throw error;
  }
};

// Delete a vendor by ID
export const deleteVendor = async (id) => {
  try {
    // Make a DELETE request to delete a vendor by its ID
    const response = await axios.delete(`${API_URL}/${id}`);

    // Return the response message (assuming your API sends a message)
    return response.data;
  } catch (error) {
    console.error(`Error deleting vendor with ID ${id}:`, error);
    throw error;
  }
};
