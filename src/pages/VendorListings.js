import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  MenuItem,
  Rating,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { fetchVendors } from "../services/vendorService"; // Import the fetchVendors function

const VendorListings = () => {
  const [vendors, setVendors] = useState([]); // State to hold vendor data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredVendors, setFilteredVendors] = useState([]); // State for filtered vendor list
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter state
  const [ratingFilter, setRatingFilter] = useState(""); // Rating filter state
  const [favorites, setFavorites] = useState([]); // State for favorite vendors

  const navigate = useNavigate(); // Create the navigate function

  // Responsive theme handling
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile size

  // Load favorite vendors from localStorage when component mounts
  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteVendors")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Fetch vendors from the backend when the component mounts
  useEffect(() => {
    const getVendors = async () => {
      try {
        const vendorData = await fetchVendors();
        setVendors(vendorData);
        setFilteredVendors(vendorData); // Initially display all vendors
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      }
    };

    getVendors();
  }, []);

  // Function to apply filters based on category and rating
  const applyFilters = () => {
    let searchResults = vendors;

    // Filter by category
    if (categoryFilter) {
      searchResults = searchResults.filter(
        (vendor) => vendor.category === categoryFilter
      );
    }

    // Filter by rating
    if (ratingFilter) {
      searchResults = searchResults.filter(
        (vendor) => Math.round(vendor.rating) === parseInt(ratingFilter, 10)
      );
    }

    setFilteredVendors(searchResults);
  };

  // Function to handle search without button press
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    let searchResults = vendors;

    // Filter by search query
    if (e.target.value) {
      searchResults = searchResults.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          vendor.category
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          vendor.location.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }

    setFilteredVendors(searchResults);
  };

  // Reset filters to initial state
  const handleResetFilters = () => {
    setCategoryFilter("");
    setRatingFilter("");
    setFilteredVendors(vendors); // Reset to display all vendors
  };

  // Toggle favorite status of a vendor
  const toggleFavorite = (vendor) => {
    const updatedFavorites = favorites.includes(vendor)
      ? favorites.filter((fav) => fav !== vendor) // Remove from favorites
      : [...favorites, vendor]; // Add to favorites

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteVendors", JSON.stringify(updatedFavorites)); // Store in localStorage
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Stack vertically on mobile, row on desktop
        bgcolor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      {/* Left Sidebar: Filters Section */}
      <Box
        sx={{
          flex: "1 1 20%",
          bgcolor: "#ffffff",
          p: 2,
          borderRight: isMobile ? "none" : "1px solid #e0e0e0", // Remove border on mobile
          display: isMobile ? "block" : "flex",
          flexDirection: "column",
          gap: 3,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>

        {/* Search Field */}
        <TextField
          label="Search Vendors"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          sx={{ marginBottom: 3 }} // Add space between search and filters
        />

        {/* Category Filter */}
        <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Category"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Concrete Suppliers">Concrete Suppliers</MenuItem>
            <MenuItem value="Equipment Rental">Equipment Rental</MenuItem>
            <MenuItem value="Material Suppliers">Material Suppliers</MenuItem>
          </Select>
        </FormControl>

        {/* Rating Filter */}
        <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            label="Rating"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {[1, 2, 3, 4, 5].map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating} & Up
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Apply Filters Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={applyFilters}
          fullWidth
        >
          Apply Filters
        </Button>

        {/* Reset Filters Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleResetFilters}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Reset Filters
        </Button>
      </Box>

      {/* Center Section: Verified Construction Vendors */}
      <Box sx={{ flex: "2 1 60%", p: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 3,
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Verified Construction Vendors
        </Typography>

        <Grid container spacing={3} sx={{ px: { xs: 1, md: 3 } }}>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Link
                  to={`/vendor/${vendor._id}`} // Navigate to a new page using vendor ID
                  style={{ textDecoration: "none" }} // Remove default link styling
                >
                  <Card
                    sx={{
                      borderRadius: "8px",
                      boxShadow: 3,
                      margin: "auto",
                      height: "100%",
                      position: "relative",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)", // Slightly enlarge on hover
                      },
                    }}
                  >
                    {vendor.imageUrl && (
                      <CardMedia
                        component="img"
                        height="160"
                        image={`${vendor.imageUrl}`}
                        alt={vendor.name}
                        sx={{
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                          objectFit: "cover", // Ensure the image fits well within the area
                        }}
                      />
                    )}
                    <CardContent sx={{ padding: { xs: "12px", md: "16px" } }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontSize: { xs: "1.1rem", md: "1.3rem" },
                          fontWeight: "bold",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "#1976d2",
                        }}
                      >
                        {vendor.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                      >
                        {vendor.category}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
                      >
                        {vendor.location}
                      </Typography>
                      <Rating name="read-only" value={vendor.rating} readOnly />
                      <Typography
                        variant="body2"
                        paragraph
                        sx={{
                          mt: 1,
                          fontSize: { xs: "0.85rem", md: "1rem" },
                          lineHeight: 1.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {vendor.description.length > 60
                          ? vendor.description.substring(0, 60) + "..."
                          : vendor.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        paddingLeft: 2,
                        paddingBottom: 2,
                        gap: 0.5,
                      }}
                    >
                      <Button
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation when button is clicked
                          navigate(`/vendor/${vendor._id}`);
                        }}
                        sx={{
                          fontSize: "0.875rem",
                          textTransform: "none",
                          p: 0,
                        }}
                      >
                        Contact Vendor
                      </Button>

                      {vendor.phone && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ fontSize: "0.875rem" }}
                        >
                          Phone: {vendor.phone}
                        </Typography>
                      )}

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation when icon button is clicked
                          toggleFavorite(vendor);
                        }}
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          color: favorites.includes(vendor)
                            ? "#f50057"
                            : "#aaa",
                        }}
                      >
                        {favorites.includes(vendor) ? (
                          <Favorite />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </IconButton>
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ padding: 2, textAlign: "center", width: "100%" }}
            >
              No vendors found. Please try a different search query.
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Right Sidebar: Favorites Section */}
      <Box
        sx={{
          flex: "1 1 20%",
          bgcolor: "#ffffff",
          p: 2,
          borderLeft: isMobile ? "none" : "1px solid #e0e0e0", // Remove border on mobile
          display: isMobile ? "block" : "flex",
          flexDirection: "column",
          gap: 2,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: "1rem", // Increase font size
            fontWeight: "bold", // Increase font weight
            color: "#ffffff", // Change text color
            background: "linear-gradient(45deg, #FF4081 30%, #F50057 90%)", // Gradient background
            borderRadius: "8px", // Round the corners
            padding: "10px 20px", // Add padding
            boxShadow: "0 3px 5px 2px rgba(245, 0, 87, .3)", // Apply box shadow
            textAlign: "center", // Center the text
            textTransform: "uppercase", // Uppercase text transformation
          }}
        >
          Favorite Vendors
        </Typography>
        {favorites.length > 0 ? (
          favorites.map((vendor, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: "8px",
                boxShadow: 2,
                height: "100%",
                marginBottom: 2,
              }}
            >
              {vendor.imageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`${vendor.imageUrl}`}
                  alt={vendor.name}
                  sx={{
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                />
              )}
              <CardContent sx={{ padding: { xs: "8px", md: "16px" } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  {vendor.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {vendor.category}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
                >
                  {vendor.location}
                </Typography>
                <Rating name="read-only" value={vendor.rating} readOnly />
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => toggleFavorite(vendor)}
                  sx={{ fontSize: "0.875rem", textTransform: "none" }}
                >
                  Remove from Favorites
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No favorites added yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default VendorListings;
