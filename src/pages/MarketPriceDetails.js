import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import Footer from "../components/Layout/Footer";
import { fetchMarketPriceById } from "../services/priceService";
import { Telegram } from "@mui/icons-material";

const MarketPriceDetails = () => {
  const { id } = useParams(); // Extract the item ID from the URL
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false); // State for showing contact modal
  const [setWishlist] = useState([]); // Wishlist state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state for wishlist

  const theme = useTheme(); // Get the current theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small (mobile)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMarketPriceById(id); // Fetch item details by ID
        setItemDetails(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Handler to add the item to the wishlist
  const handleAddToWishlist = () => {
    setWishlist((prev) => [...prev, itemDetails]);
    setSnackbarOpen(true);
  };

  // Handler for sharing the item on Telegram
  const handleShareOnTelegram = () => {
    const message = `Check out this item: ${itemDetails.type}\nPrice: $${itemDetails.price}\nLocation: ${itemDetails.city}, ${itemDetails.country}`;
    const telegramLink = `https://t.me/share/url?url=${
      window.location.href
    }&text=${encodeURIComponent(message)}`;
    window.open(telegramLink, "_blank");
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!itemDetails) {
    return (
      <Typography variant="h6">No details found for this item.</Typography>
    );
  }

  // Destructure itemDetails for easier usage
  const {
    type,
    country,
    city,
    industry,
    price,
    make,
    specs,
    subType,
    date,
    imageUrl,
    owner = { name: "John Doe", contact: "+1-555-1234" }, // Default owner details
  } = itemDetails;

  return (
    <Box
      sx={{
        padding: isSmallScreen ? 2 : 3, // Adjust padding based on screen size
      }}
    >
      {/* Header Banner */}
      <Paper
        sx={{
          padding: isSmallScreen ? 1 : 1.5, // Reduced padding for mobile
          marginBottom: isSmallScreen ? 1 : 2, // Adjust margin for mobile
          background: "linear-gradient(to right, #4e54c8, #8f94fb)",
          color: "white",
          borderRadius: 1,
          boxShadow: 3,
          textAlign: isSmallScreen ? "center" : "left", // Center text for small screens
        }}
      >
        <Typography
          variant={isSmallScreen ? "h5" : "h4"} // Smaller header on mobile
          align="center"
          gutterBottom
          sx={{ fontWeight: 400, letterSpacing: 1 }}
        >
          {type} Details
        </Typography>
      </Paper>
      {/* Main Grid Container for Layout */}
      <Grid container spacing={isSmallScreen ? 2 : 3}>
        {/* Left Panel for Images */}
        <Grid item xs={12} md={6}>
          <Card>
            {/* Main Image Display */}
            <CardMedia
              component="img"
              height={isSmallScreen ? "250" : "400"} // Adjust image height based on screen size
              image={`${imageUrl}` || "https://via.placeholder.com/150"}
              alt={`${type} image`}
              sx={{ borderBottom: "1px solid #ddd" }}
            />
          </Card>
        </Grid>

        {/* Right Panel for Details */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: isSmallScreen ? 2 : 3, // Adjust padding for smaller screens
              borderRadius: 2,
              textAlign: isSmallScreen ? "center" : "left", // Center align text for small screens
            }}
          >
            <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom>
              {type}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Industry: {industry}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Sub Title: {subType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Make: {make}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Specifications: {specs}
            </Typography>

            {/* Price Information */}
            <Typography
              variant={isSmallScreen ? "h6" : "h5"}
              sx={{ marginTop: 2 }}
            >
              Price: ${price}
            </Typography>

            {/* Location and Date */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Location: {city}, {country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date Added: {new Date(date).toLocaleDateString()}
            </Typography>

            {/* Buttons for Additional Features */}
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row", // Stack buttons on small screens
                alignItems: "center",
                justifyContent: isSmallScreen ? "center" : "flex-start",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginBottom: isSmallScreen ? 1 : 0, // Add bottom margin for mobile stacking
                  marginRight: isSmallScreen ? 0 : 1,
                }}
                onClick={() => setShowContact(true)}
              >
                Contact Seller
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  marginBottom: isSmallScreen ? 1 : 0, // Add bottom margin for mobile stacking
                  marginRight: isSmallScreen ? 0 : 1,
                }}
                onClick={handleAddToWishlist}
              >
                Add to Wishlist
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleShareOnTelegram}
                startIcon={<Telegram />}
              >
                Share on Telegram
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Product Specifications Section */}
      <Box
        sx={{
          marginTop: 5,
          padding: isSmallScreen ? 2 : 3, // Adjust padding for specifications based on screen size
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Product Specifications
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Compact Specifications List */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Title:
            </Typography>
            <Typography variant="body1">{type}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Sub Title:
            </Typography>
            <Typography variant="body1">{subType}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Make:
            </Typography>
            <Typography variant="body1">{make}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Specifications:
            </Typography>
            <Typography variant="body1">{specs}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              Country:
            </Typography>
            <Typography variant="body1">{country}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              City:
            </Typography>
            <Typography variant="body1">{city}</Typography>
          </Grid>
        </Grid>
      </Box>
      {/* Contact Seller Modal */}
      <Dialog
        open={showContact}
        onClose={() => setShowContact(false)}
        maxWidth="xs" // Set a maximum width for the dialog
        fullWidth // Use the full width based on the maxWidth value
      >
        <DialogTitle sx={{ fontSize: "1.25rem" }}>Contact Seller</DialogTitle>{" "}
        {/* Adjust title font size */}
        <DialogContent sx={{ padding: 2 }}>
          <Typography
            variant="body1"
            sx={{ fontSize: "1rem", marginBottom: 1 }}
          >
            Name: {owner.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            Phone: {owner.contact}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 1 }}>
          <Button onClick={() => setShowContact(false)} size="small">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Contact Seller Modal */}
      <Paper
        sx={{
          width: "100%", // Full width
          marginTop: 5,
          padding: isSmallScreen ? 2 : 3,
        }}
      >
        <Footer />
      </Paper>
      {/* Snackbar Notification for Wishlist */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="Item added to wishlist successfully!"
      />
    </Box>
  );
};

export default MarketPriceDetails;
