import React, { useState, useEffect } from "react";
import { Typography, TextField, Box, Button, Paper, Grid } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { getCompanyNameFromToken } from "../utils/auth"; // Import the utility function
import { createNews } from "../services/newsService"; // Import the createNews function

const NewsInputPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");
  const [publishedAt, setPublishedAt] = useState(moment());
  const [personName, setPersonName] = useState(""); // Automatically set personName from the auth
  const [loading, setLoading] = useState(false); // Loading state for submit button
  const [message, setMessage] = useState(""); // Message state for success or error messages

  // Fetch the company name from the token once the component is mounted
  useEffect(() => {
    const companyName = getCompanyNameFromToken(); // Call the utility function
    setPersonName(companyName); // Set the company name as the person name
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newArticle = {
      title,
      description,
      source,
      url,
      publishedAt: publishedAt.format("YYYY-MM-DD"),
      personName, // Include person name in the article data
    };

    try {
      // Call the createNews service function
      await createNews(newArticle);
      setMessage("Article submitted successfully!");
      // Clear the form fields after submission
      setTitle("");
      setDescription("");
      setSource("");
      setUrl("");
      setPublishedAt(moment());
    } catch (error) {
      console.error("Error creating news article:", error);
      setMessage("Failed to submit article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography
                variant="h4"
                sx={{ mb: 4, textAlign: "center", color: "#1976d2" }}
              >
                News & Updates Input Form
              </Typography>
              <form onSubmit={handleSubmit}>
                {/* Person Name Field - this is now automatically filled */}
                <TextField
                  label="Person Name"
                  variant="outlined"
                  fullWidth
                  value={personName}
                  disabled // Disable the field since it's automatically filled from the auth
                  sx={{ mb: 3 }}
                />

                {/* Title Field */}
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                />

                {/* Description Field */}
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                />

                {/* Source Field */}
                <TextField
                  label="Source"
                  variant="outlined"
                  fullWidth
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  sx={{ mb: 3 }}
                />

                {/* URL Field */}
                <TextField
                  label="URL"
                  variant="outlined"
                  fullWidth
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                />

                {/* Published Date Picker */}
                <DatePicker
                  label="Published Date"
                  value={publishedAt}
                  onChange={setPublishedAt}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth sx={{ mb: 3 }} />
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 3,
                    p: 1.5,
                    borderRadius: "8px",
                    fontSize: "1rem",
                    backgroundColor: "#1976d2",
                  }}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Submitting..." : "Submit Article"}
                </Button>
              </form>
              {/* Display message for success or error */}
              {message && (
                <Typography
                  variant="body1"
                  sx={{
                    mt: 3,
                    textAlign: "center",
                    color: message.includes("successfully") ? "green" : "red",
                  }}
                >
                  {message}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default NewsInputPage;
