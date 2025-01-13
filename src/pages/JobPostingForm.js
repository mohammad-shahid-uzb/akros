import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { createJobPosting } from "../services/jobPostingService"; // Import the service function
import { getCompanyNameFromToken } from "../utils/auth"; // Import the utility function

// Define the initial state of the form
const initialFormData = {
  periodOfPublication: "01-02-1980",
  fieldOfActivity: "Engineer",
  duties: "Full Time",
  age: "22",
  gender: "",
  residence: "Tashkent",
  education: "B.E",
  professionalRequirements: "6Y Exp",
  workingConditions: "good",
  region: "Uzbek",
  employment: "Full",
  salaryOffered: { amount: "", currency: "USD" }, // Combined salary and currency
  additionalInfo: "Nil",
  companyName: "", // This field will be populated from the JWT token
  numberOfVacancies: 1, // Default to 1 to avoid negative values and uncontrolled state
};

const JobPostingForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState(initialFormData);

  // State for Snackbar notification
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Retrieve the company name from the JWT token and update the form data
  useEffect(() => {
    const companyName = getCompanyNameFromToken() || ""; // Ensure it's not undefined
    setFormData((prevFormData) => ({
      ...prevFormData,
      companyName: companyName,
    }));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the change is related to the salaryOffered field
    if (name === "salaryAmount" || name === "salaryCurrency") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        salaryOffered: {
          ...prevFormData.salaryOffered,
          amount:
            name === "salaryAmount" ? value : prevFormData.salaryOffered.amount,
          currency:
            name === "salaryCurrency"
              ? value
              : prevFormData.salaryOffered.currency,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle number of vacancies to ensure it doesn't go below 1
  const handleVacancyChange = (e) => {
    const { name, value } = e.target;
    const vacancies = value >= 1 ? value : 1; // Ensure the value is at least 1
    setFormData({
      ...formData,
      [name]: vacancies,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a formatted data object for submission, ensuring the correct types
      const formattedData = {
        ...formData,
        salaryOffered: {
          ...formData.salaryOffered,
          amount: Number(formData.salaryOffered.amount), // Ensure amount is a number
        },
        numberOfVacancies: Number(formData.numberOfVacancies), // Ensure numberOfVacancies is a number
      };

      // Remove the redundant root-level currency field if present
      const { currency, ...finalData } = formattedData;

      console.log("Submitting form data:", finalData); // Debugging log for form data

      // Send form data to the backend to create a new job posting
      const response = await createJobPosting(finalData);
      console.log("Form data submitted successfully:", response);

      // Set success message and open Snackbar
      setSnackbarMessage("Job posting created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Use setTimeout to reset form after the Snackbar state is set
      setTimeout(() => {
        // Reset form data to initial state while keeping companyName intact
        setFormData({ ...initialFormData, companyName: formData.companyName });
        console.log("Form reset successful after submission."); // Confirm reset in log
      }, 500); // Adjust the timeout delay as needed
    } catch (error) {
      console.error("Error creating job posting:", error);

      // Set error message and open Snackbar
      setSnackbarMessage("Failed to create job posting. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Handle Snackbar close event
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: 1,
          }}
        >
          Post a Job
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontStyle: "italic",
            color: "#555",
            lineHeight: 1.5,
          }}
        >
          Provide the details below to create and manage a new job listing.
        </Typography>
      </Box>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Company Name (Disabled) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              disabled // Keep the company name field disabled as it comes from the JWT token
            />
          </Grid>

          {/* Period of Publication */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Period of Publication"
              name="periodOfPublication"
              value={formData.periodOfPublication}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Field of Activity / Position */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Field of Activity / Position"
              name="fieldOfActivity"
              value={formData.fieldOfActivity}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Duties */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Duties"
              name="duties"
              multiline
              rows={4}
              value={formData.duties}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Age */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Residence */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Residence"
              name="residence"
              value={formData.residence}
              onChange={handleChange}
            />
          </Grid>

          {/* Education */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </Grid>

          {/* Professional Requirements */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Professional Requirements"
              name="professionalRequirements"
              multiline
              rows={4}
              value={formData.professionalRequirements}
              onChange={handleChange}
            />
          </Grid>

          {/* Working Conditions */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Working Conditions"
              name="workingConditions"
              multiline
              rows={4}
              value={formData.workingConditions}
              onChange={handleChange}
            />
          </Grid>

          {/* Region */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Region"
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
          </Grid>

          {/* Employment */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employment"
              name="employment"
              value={formData.employment}
              onChange={handleChange}
            />
          </Grid>

          {/* Salary Offered and Currency Combined */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Grid container spacing={2}>
                {/* Salary Amount */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Salary Offered"
                    name="salaryAmount"
                    value={formData.salaryOffered.amount}
                    onChange={handleChange}
                    type="number" // Use number type for salary input
                    inputProps={{ min: 0 }} // Restrict input value to a minimum of 0
                  />
                </Grid>
                {/* Currency Selection */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="currency-label">Currency</InputLabel>
                    <Select
                      labelId="currency-label"
                      name="salaryCurrency"
                      value={formData.salaryOffered.currency}
                      onChange={handleChange}
                    >
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="UZS">UZS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>

          {/* Available Vacancy */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Available Vacancy"
              name="numberOfVacancies"
              type="number" // Use number type for vacancies
              value={formData.numberOfVacancies}
              onChange={handleVacancyChange}
              inputProps={{ min: 1 }} // Ensure value cannot be less than 1
            />
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Information"
              name="additionalInfo"
              multiline
              rows={6}
              value={formData.additionalInfo}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        {/* Submit and Cancel Buttons */}
        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginRight: 2 }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
        </Box>
      </form>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Set auto-hide duration
        onClose={handleSnackbarClose} // Handle close event
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Snackbar position
      >
        <Alert
          onClose={handleSnackbarClose} // Handle alert close
          severity={snackbarSeverity} // Set severity based on state
          sx={{ width: "100%" }} // Full width Snackbar
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JobPostingForm;
