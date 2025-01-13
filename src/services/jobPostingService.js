import axios from "axios";

//const API_URL = "http://localhost:5000/api/jobPostings"; // Replace with your backend API URL
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/jobPostings`;
// Function to create a new job posting
export const createJobPosting = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job posting:", error);
    throw error;
  }
};

// Function to get all job postings
export const getJobPostings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching job postings:", error);
    throw error;
  }
};

// Function to get a job posting by ID
export const getJobPostingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job posting:", error);
    throw error;
  }
};

// Function to update a job posting by ID
export const updateJobPosting = async (id, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error updating job posting:", error);
    throw error;
  }
};

// Function to delete a job posting by ID
export const deleteJobPosting = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job posting:", error);
    throw error;
  }
};
