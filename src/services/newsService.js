// services/newsService.js
import axios from "axios";

// Set the base URL of your backend API for news
//const API_URL = "http://localhost:5000/api/news";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/news`;
// Fetch all news articles
export const fetchNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Fetch a single news article by ID
export const fetchNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news article with ID ${id}:`, error);
    throw error;
  }
};

// Create a new news article
export const createNews = async (newsData) => {
  try {
    const response = await axios.post(API_URL, newsData);
    return response.data;
  } catch (error) {
    console.error("Error creating news article:", error);
    throw error;
  }
};

// Update a news article
export const updateNews = async (id, newsData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, newsData);
    return response.data;
  } catch (error) {
    console.error(`Error updating news article with ID ${id}:`, error);
    throw error;
  }
};

// Delete a news article
export const deleteNews = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting news article with ID ${id}:`, error);
    throw error;
  }
};
