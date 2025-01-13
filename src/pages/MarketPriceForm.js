import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Snackbar,
  Alert,
  Paper,
  MenuItem,
} from "@mui/material";
import { createMarketPrice } from "../services/priceService"; // Import the service function

// List of cities in Uzbekistan for the dropdown
const uzbekistanCities = [
  "Tashkent",
  "Samarkand",
  "Bukhara",
  "Khiva",
  "Andijan",
  "Fergana",
  "Namangan",
  "Nukus",
  "Kokand",
  "Termiz",
  "Navoi",
  "Jizzakh",
  "Karakalpakstan",
];

const initialFormState = {
  type: "",
  subType: "",
  make: "",
  specs: "",
  price: "",
  imageFile: null, // Use imageFile to store the uploaded file
  country: "Uzbekistan", // Set default country to Uzbekistan
  city: "",
  industry: "",
};

const MarketPriceForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: files[0], // Store the file in imageFile
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the form data for submission
      const form = new FormData();
      form.append("type", formData.type);
      form.append("subType", formData.subType);
      form.append("make", formData.make);
      form.append("specs", formData.specs);
      form.append("price", formData.price);
      form.append("country", formData.country);
      form.append("city", formData.city);
      form.append("industry", formData.industry);
      if (formData.imageFile) form.append("image", formData.imageFile); // Send file under "image"

      // Call the service function to create the market price
      const response = await createMarketPrice(form); // Use FormData object

      console.log("Response data:", response);
      setFormData(initialFormState); // Reset form after successful submission
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error creating market price entry:", error);
      setError("Failed to create market price entry. Please try again.");
    }
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
          color: "#333", // Apply a modern color
          letterSpacing: 1.2,
        }}
      >
        Add New Market Price Entry
      </Typography>

      {/* Form Container */}
      <Paper elevation={4} sx={{ padding: 5, borderRadius: 2, mb: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 800,
            mx: "auto",
            backgroundColor: "#f4f4f4", // Light background color for contrast
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Add a shadow for a floating effect
            padding: 4,
          }}
        >
          <Grid container spacing={4}>
            {/* Type and SubType Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Name"
                name="subType"
                value={formData.subType}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
            </Grid>

            {/* Make and Price Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
            </Grid>

            {/* Specifications Field */}
            <Grid item xs={12}>
              <TextField
                label="Specifications"
                name="specs"
                value={formData.specs}
                onChange={handleChange}
                multiline
                rows={5} // Display 5 rows by default
                fullWidth
                inputProps={{ maxLength: 2000 }}
                required
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
            </Grid>

            {/* Country and City Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                disabled // Set as disabled since it's a predefined value
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              >
                {uzbekistanCities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Industry Field */}
            <Grid item xs={12}>
              <TextField
                select
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              >
                {[
                  "Civil Works",
                  "Electrical",
                  "HVAC",
                  "Plumbing",
                  "Fire Fighting",
                ].map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industry}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Image Upload Field */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Upload Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              {formData.imageFile && (
                <Typography
                  variant="body2"
                  sx={{ marginTop: 1, textAlign: "center" }}
                >
                  Selected file: {formData.imageFile.name}
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
                sx={{
                  backgroundColor: "#28a745",
                  borderRadius: 2,
                  paddingY: 1.5,
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "#218838" },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Snackbar for Success Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Market price entry created successfully!
        </Alert>
      </Snackbar>

      {/* Error Message */}
      {error && (
        <Typography
          variant="body1"
          color="error"
          sx={{ textAlign: "center", mt: 2 }}
        >
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default MarketPriceForm;
