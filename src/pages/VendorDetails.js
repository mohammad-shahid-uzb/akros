import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVendorById } from "../services/vendorService"; // Import the service function
import VendorTopCard from "../pages/VendorTopCard";
import { Box, Typography, CircularProgress } from "@mui/material";
import Footer from "../components/Layout/Footer";

const VendorDetails = () => {
  const { id } = useParams(); // Get the vendor ID from URL parameters
  const [vendor, setVendor] = useState(null); // State to hold vendor data
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch the vendor details based on the ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorData = await fetchVendorById(id); // Fetch vendor by ID
        setVendor(vendorData); // Set vendor data to state
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch vendor details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if vendor data is not found
  if (!vendor) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" color="error">
          Vendor not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "24px",
        display: "flex", // or display: "grid"
        flexDirection: "column", // Arrange items vertically
        gap: 4, // Adds space between each child component (4*8px = 32px gap)
      }}
    >
      {/* Top Banner Section */}
      <VendorTopCard Vendor={vendor} />
      <Footer />
    </Box>
  );
};

export default VendorDetails;
