import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../components/Layout/Footer";
import { fetchMarketPrices } from "../services/priceService";

const initialFilterState = {
  country: "All",
  city: "All",
  industry: "All",
};

const MarketPriceInsights = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(initialFilterState);
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    cities: [],
    industries: [],
  });
  const [marketPrices, setMarketPrices] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(initialFilterState);

  console.log("marketPrices", marketPrices);

  // Fetch initial data and filter options
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const data = await fetchMarketPrices();
      console.log("marketdata", data);
      setMarketPrices(data || []);

      const countries = ["All", ...new Set(data.map((item) => item.country))];
      const cities = ["All", ...new Set(data.map((item) => item.city))];
      const industries = ["All", ...new Set(data.map((item) => item.industry))];

      setFilterOptions({ countries, cities, industries });
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const handleSearch = async (searchValue) => {
    try {
      const data = await fetchMarketPrices({ search: searchValue });
      setMarketPrices(data || []);
    } catch (error) {
      console.error("Error fetching data based on search:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const applyFiltersToData = (data, filters) => {
    return data.filter((item) => {
      const isCountryMatch =
        filters.country === "All" || item.country === filters.country;
      const isCityMatch = filters.city === "All" || item.city === filters.city;
      const isIndustryMatch =
        filters.industry === "All" || item.industry === filters.industry;

      return isCountryMatch && isCityMatch && isIndustryMatch;
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setAppliedFilters(initialFilterState);
    setSearchTerm("");
    fetchInitialData();
    setSnackbarOpen(true);
  };

  const filteredItems = applyFiltersToData(marketPrices, appliedFilters);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header Section */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#8EC5FC", // Light gradient starting color
          backgroundImage: "linear-gradient(90deg, #8EC5FC 0%, #E0C3FC 100%)", // Gradient color for a more appealing look
          padding: 1,
          boxShadow: "none", // Remove default AppBar shadow for a sleeker appearance
          marginY: 2,
        }}
      >
        <Container>
          <Toolbar>
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                color: "#333", // Change to a darker color for contrast against the lighter background
                letterSpacing: 1.5,
              }}
            >
              Market & Material Insights
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          padding: 3,
          flexDirection: isMobile ? "column" : "row",
          backgroundColor: "#f4f6f8",
        }}
      >
        {/* Filters Section */}
        <Box
          sx={{
            width: isMobile ? "100%" : "25%",
            paddingRight: isMobile ? 0 : 3,
            marginBottom: isMobile ? 2 : 0,
            backgroundColor: "#fff",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Search"
                variant="outlined"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* Country Filter */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Select Country"
                variant="outlined"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                sx={{ marginBottom: 2 }}
              >
                {filterOptions.countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* City Filter */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Select City"
                variant="outlined"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                sx={{ marginBottom: 2 }}
              >
                {filterOptions.cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Industry Filter */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Select Industry"
                variant="outlined"
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
                sx={{ marginBottom: 2 }}
              >
                {filterOptions.industries.map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industry}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Apply Filters Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleApplyFilters}
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #4A00E0, #8E2DE2)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #8E2DE2, #4A00E0)",
                  },
                }}
              >
                Apply Filters
              </Button>
            </Grid>

            {/* Reset Filters Button */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleResetFilters}
                sx={{ fontWeight: "bold" }}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Listings Section */}
        <Box
          sx={{
            width: isMobile ? "100%" : "75%",
            paddingLeft: isMobile ? 0 : 3,
            marginTop: isMobile ? 2 : 0,
          }}
        >
          <Grid container spacing={3}>
            {filteredItems.length > 0 ? (
              filteredItems.slice(0, 6).map((item) => {
                const image = item.imageUrl
                  ? `${item.imageUrl}`
                  : "https://via.placeholder.com/150";

                return (
                  <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <Link
                      to={`/marketpricedetails/${item._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        sx={{
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: "transform 0.3s",
                          "&:hover": { transform: "scale(1.02)" },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="180"
                          image={image}
                          alt={item.type || "No Image Available"}
                        />
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", marginBottom: 1 }}
                          >
                            {item.type}
                          </Typography>
                          <Typography variant="body1">
                            Country: {item.country}
                          </Typography>
                          <Typography variant="body1">
                            City: {item.city}
                          </Typography>
                          <Typography variant="body1">
                            Industry: {item.industry}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })
            ) : (
              <Typography sx={{ marginTop: 3, textAlign: "center" }}>
                No items to display. Please apply filters to view items.
              </Typography>
            )}
          </Grid>

          {/* Snackbar Notification */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Filters have been reset successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Box>

      {/* Footer */}
      <Footer sx={{ marginTop: "auto", backgroundColor: "#f8f9fa" }} />
    </Box>
  );
};

export default MarketPriceInsights;
