import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { createJobApplication } from "../services/jobApplicationService"; // Import the service function

const JobApplicationForm = () => {
  const { companyName, jobTitle } = useParams();

  // Decode company name and job title to display correctly
  const decodedCompanyName = decodeURIComponent(companyName).replace(/-/g, " ");
  const decodedJobTitle = decodeURIComponent(jobTitle).replace(/-/g, " ");
  const navigate = useNavigate();

  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [resume, setResume] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicantName || !applicantEmail || !applicantPhone || !resume) {
      setErrorMessage("Please fill out all fields and upload your resume.");
      return;
    }

    if (resume.type !== "application/pdf" || resume.size > 15 * 1024 * 1024) {
      setErrorMessage("File must be a PDF and under 15 MB in size.");
      return;
    }

    const formData = new FormData();
    formData.append("jobTitle", decodedJobTitle);
    formData.append("companyName", decodedCompanyName);
    formData.append("applicantName", applicantName);
    formData.append("applicantEmail", applicantEmail);
    formData.append("applicantPhone", applicantPhone);
    formData.append("resume", resume);

    try {
      setIsSubmitting(true);
      const response = await createJobApplication(formData);

      setSuccessMessage(response.message);
      setErrorMessage("");
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setResume(null);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Failed to submit application.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Apply for {decodedJobTitle} at {decodedCompanyName}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Company Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                variant="outlined"
                value={decodedCompanyName}
                InputProps={{
                  readOnly: true, // Make the field read-only
                }}
              />
            </Grid>
            {/* Job Title Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                variant="outlined"
                value={decodedJobTitle}
                InputProps={{
                  readOnly: true, // Make the field read-only
                }}
              />
            </Grid>
            {/* Full Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
              />
            </Grid>
            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
              />
            </Grid>
            {/* Phone Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                value={applicantPhone}
                onChange={(e) => setApplicantPhone(e.target.value)}
              />
            </Grid>
            {/* Upload Resume Field */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  marginBottom: 2,
                  backgroundColor: resume ? "green" : undefined,
                }}
              >
                {resume ? "Change Resume" : "Upload Resume"}
                <input type="file" hidden onChange={handleResumeChange} />
              </Button>
              {resume && (
                <Typography variant="body2">
                  Uploaded file: {resume.name} (
                  {(resume.size / 1024).toFixed(2)} KB)
                </Typography>
              )}
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </Grid>
          </Grid>
        </form>
        {/* Success and Error Messages */}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate("/labor/job-seekers")}
          sx={{ marginTop: 2 }}
        >
          Back to Job Listings
        </Button>
      </Paper>
    </Box>
  );
};

export default JobApplicationForm;
