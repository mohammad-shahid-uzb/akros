import axios from "axios";

// Define the base URL for the job applications API
//const API_URL = "http://localhost:5000/api/jobApplications"; // Replace with your backend API URL
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/jobApplications`;
// Function to create a new job application
export const createJobApplication = async (applicationData) => {
  try {
    // Send a POST request with the application data
    const response = await axios.post(API_URL, applicationData, {
      headers: { "Content-Type": "multipart/form-data" }, // For file uploads
    });
    return response.data;
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
};

// Function to get all job applications
export const getJobApplications = async () => {
  try {
    // Send a GET request to fetch all job applications
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};

// Function to get a specific job application by ID
export const getJobApplicationById = async (id) => {
  try {
    // Send a GET request with the job application ID
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job application:", error);
    throw error;
  }
};

// Function to get all job applications submitted to a specific company
export const getApplicationsForCompany = async (companyName) => {
  try {
    console.log("companyName", companyName);
    // Replace spaces with hyphens to match URL-friendly format
    const formattedCompanyName = companyName.replace(/\s+/g, "-");
    // Send a GET request to fetch all job applications for the given company name
    const response = await axios.get(
      `${API_URL}/company/${formattedCompanyName}`
    );
    console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching job applications for company:", error);
    throw error;
  }
};

// Function to update a job application by ID
export const updateJobApplication = async (id, applicationData) => {
  try {
    // Send a PUT request with the updated application data
    const response = await axios.put(`${API_URL}/${id}`, applicationData);
    return response.data;
  } catch (error) {
    console.error("Error updating job application:", error);
    throw error;
  }
};

// Function to delete a job application by ID
export const deleteJobApplication = async (id) => {
  try {
    // Send a DELETE request with the job application ID
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job application:", error);
    throw error;
  }
};
