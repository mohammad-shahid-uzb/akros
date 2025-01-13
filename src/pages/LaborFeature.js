import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../components/Layout/Footer";

const companies = [
  { name: "DHL", reviews: "28,146 reviews" },
  { name: "Chick-fil-A Corporate", reviews: "142 reviews" },
  { name: "PetSmart", reviews: "13,517 reviews" },
  { name: "Burlington Stores", reviews: "13,683 reviews" },
  { name: "Olive Garden", reviews: "16,523 reviews" },
  { name: "Ulta", reviews: "10,726 reviews" },
  { name: "ALDI", reviews: "14,036 reviews" },
  { name: "PepsiCo", reviews: "20,284 reviews" },
];

const LaborPage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Labor Feature
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Choose a section to manage labor-related tasks and information.
      </Typography>

      {/* Overview Section */}
      <Box
        sx={{
          marginTop: 2,
          marginBottom: 2,
          padding: 2,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Explore Our Services
        </Typography>
        <Typography variant="body1">
          Our platform offers tailored solutions for both employers and job
          seekers. Whether you are looking to find the right candidates or
          seeking new opportunities, we have the tools and resources to support
          your needs.
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        {/* Employers Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/labor/employers" style={{ textDecoration: "none" }}>
            <Paper
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                transition: "0.3s",
                backgroundColor: "#4CAF50",
                color: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#45a049",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                For Employers
              </Typography>
              <Typography variant="body1">
                Manage job postings, view applicant profiles, and more.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        {/* Job Seekers Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/labor/job-seekers" style={{ textDecoration: "none" }}>
            <Paper
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                transition: "0.3s",
                backgroundColor: "#2196F3",
                color: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#1976D2",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                For Job Seekers
              </Typography>
              <Typography variant="body1">
                Search for job opportunities, manage applications, and more.
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>

      {/* Popular Companies Section */}
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Popular Companies
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  padding: 2,
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <Typography variant="h6">{company.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {company.reviews}
                </Typography>
                <Typography variant="body2">
                  <Link to="#">Salaries</Link> | <Link to="#">Q&A</Link> |{" "}
                  <Link to="#">Open jobs</Link>
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default LaborPage;
