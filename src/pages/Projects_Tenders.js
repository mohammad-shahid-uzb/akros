import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardActions,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer"; // Assuming Footer component is in the same folder
import { fetchTenders as fetchTendersAPI } from "../services/tenderService";

const ProjectsAndTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    projectName: "",
    country: "Uzbekistan",
    sector: "All", // Set default value to "All"
    status: "Any", // Set default value to "Any"
  });
  const [page, setPage] = useState(1); // Current page number for pagination
  const tendersPerPage = 7; // Number of tenders per page
  const navigate = useNavigate();

  // Fetch tenders data from the API
  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const data = await fetchTendersAPI();
        console.log("response tender", data);

        setTenders(data);
      } catch (error) {
        console.error("Failed to fetch tenders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTenders();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1); // Reset to the first page when filters change
  };

  // Handle resetting filters
  const handleResetFilters = () => {
    setFilters({
      projectName: "",
      country: "Uzbekistan",
      sector: "All",
      status: "Any",
    });
    setPage(1); // Reset to the first page
  };

  // Apply filters to tenders list
  const filteredTenders = tenders.filter((tender) => {
    return (
      (!filters.projectName ||
        tender.title
          .toLowerCase()
          .includes(filters.projectName.toLowerCase())) &&
      (!filters.country ||
        tender.country.toLowerCase() === filters.country.toLowerCase()) &&
      (filters.sector === "All" || tender.sector === filters.sector) && // Allow "All" sectors
      (filters.status === "Any" || tender.status === filters.status) // Allow "Any" status
    );
  });

  // Get the tenders for the current page
  const indexOfLastTender = page * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = filteredTenders.slice(
    indexOfFirstTender,
    indexOfLastTender
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", marginTop: 5 }}>
        Loading...
      </Typography>
    );
  }

  const countries = ["Uzbekistan"];
  const sectors = [
    "All", // Default option to show all sectors
    "Infrastructure",
    "Energy",
    "Agriculture",
    "Water Supply",
    "Finance",
    "Healthcare",
    "Transportation",
    "Technology",
    "Environment",
  ];
  const statuses = ["Any", "Open", "Closed", "Awarded"]; // Default option to show any status

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: 700, // Increase the weight for a bolder look
          fontSize: { xs: "2rem", md: "3rem" }, // Responsive font size for different screen sizes
          color: "white", // Set text color to white
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", // Add shadow for a 3D effect
          background: "linear-gradient(90deg, #8E2DE2, #4A00E0)", // Apply gradient colors for the text
          WebkitBackgroundClip: "text", // Clip the gradient to the text only
          WebkitTextFillColor: "transparent", // Make text transparent so gradient shows through
          letterSpacing: 1.5, // Add spacing between letters for a sleek look
          paddingY: 2, // Vertical padding for spacing
        }}
      >
        Projects & Tenders
      </Typography>

      {/* Grid Container for Sidebar and Tenders */}
      <Grid container spacing={2}>
        {/* Filter Section on Left Side */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              padding: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#f9f9f9",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
              Filters
            </Typography>
            <TextField
              fullWidth
              label="Search by Project Name"
              variant="outlined"
              name="projectName"
              value={filters.projectName}
              onChange={handleFilterChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Country"
              variant="outlined"
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              sx={{ marginBottom: 2 }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Sector"
              variant="outlined"
              name="sector"
              value={filters.sector}
              onChange={handleFilterChange}
              sx={{ marginBottom: 2 }}
            >
              {sectors.map((sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Status"
              variant="outlined"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              sx={{ marginBottom: 2 }}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>

            {/* Apply and Reset Filters Buttons */}
            <Grid container spacing={1} sx={{ marginTop: 1 }}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setPage(1)}
                  sx={{ fontWeight: "bold" }}
                >
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ marginTop: 1 }}>
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
        </Grid>

        {/* Tenders List on Right Side */}
        <Grid item xs={12} md={9}>
          {/* Tenders List */}
          <Grid container spacing={2}>
            {currentTenders.length > 0 ? (
              currentTenders.map((tender) => (
                <Grid item xs={12} key={tender._id}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {tender.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginTop: 1 }}
                      >
                        Country: {tender.country} | Sector: {tender.sector} |
                        Status: {tender.status} | Deadline:{" "}
                        {new Date(tender.deadline).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: 2 }}>
                        {tender.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/tender/${tender._id}`)}
                      >
                        View Details
                      </Button>
                      {/* Display Download Button if Documents Exist */}
                      {tender.documents && tender.documents.length > 0 ? (
                        <Button
                          size="small"
                          color="secondary"
                          href={`${process.env.REACT_APP_BACKEND_URL}${tender.documents[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download Document
                        </Button>
                      ) : (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: 3, textAlign: "center" }}
                        >
                          No documents available
                        </Typography>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="h5"
                sx={{ marginTop: 3, marginLeft: 3, textAlign: "center" }}
              >
                No tenders available with the applied filters.
              </Typography>
            )}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Pagination
              count={Math.ceil(filteredTenders.length / tendersPerPage)} // Calculate total pages
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Footer at the Bottom */}
      <Box sx={{ marginTop: 5 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ProjectsAndTenders;
