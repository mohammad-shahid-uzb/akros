import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import { FaBuilding, FaSuitcase, FaFileAlt } from "react-icons/fa";
import ProtectedRoute from "./ProtectedRoute";

const EmployersSection = () => {
  const numberOfCompanies = 346;
  const numberOfVacancies = 39;
  const numberOfResumes = 4180;
  const lastUpdateDate = new Date().toLocaleString();

  return (
    <Box sx={{ padding: { xs: 1, md: 2 } }}>
      {/* Top Section with Welcome Message */}
      <Box sx={{ marginBottom: { xs: 3, md: 4 }, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: { xs: 1, md: 2 },
            fontSize: { xs: "1.5rem", md: "2.125rem" },
          }}
        >
          Welcome to the Employers Section
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: { xs: 1, md: 2 } }}>
          Here you can manage your company listings, post new job opportunities,
          and browse resumes from job seekers.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          //to="/labor/employers/dashboard"
          sx={{ marginBottom: { xs: 2, md: 3 } }}
        >
          Go to Dashboard
        </Button>
      </Box>

      {/* Stats Section */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: 3 }}
      >
        {/* Company Stats */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: 2,
              borderRadius: 1,
              background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <FaBuilding size={35} color="#007bff" />
            <Typography variant="h6" color="primary" sx={{ marginTop: 0.5 }}>
              Companies
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {numberOfCompanies}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: 0.5 }}
            >
              Last updated: {lastUpdateDate}
            </Typography>
          </Box>
        </Grid>

        {/* Vacancies Stats */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: 2,
              borderRadius: 1,
              background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <FaSuitcase size={35} color="#28a745" />
            <Typography variant="h6" color="success" sx={{ marginTop: 0.5 }}>
              Vacancies
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {numberOfVacancies}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: 0.5 }}
            >
              Last updated: {lastUpdateDate}
            </Typography>
          </Box>
        </Grid>

        {/* Resumes Stats */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: 2,
              borderRadius: 1,
              background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <FaFileAlt size={35} color="#dc3545" />
            <Typography variant="h6" color="error" sx={{ marginTop: 0.5 }}>
              Resumes
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {numberOfResumes}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: 0.5 }}
            >
              Last updated: {lastUpdateDate}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Instructions */}
      <Box sx={{ textAlign: "center", marginBottom: { xs: 3, md: 4 } }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          How to Get Started
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: { xs: 1, md: 2 } }}>
          Follow the options below to start managing your job postings or
          viewing applications.
        </Typography>
      </Box>

      {/* Compact Grid */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: { xs: 4, md: 6 } }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <ProtectedRoute user={"user"}>
            <Link
              to="/labor/employers/post-job"
              style={{ textDecoration: "none" }}
            >
              <Paper
                sx={{
                  padding: { xs: 1, md: 1.5 },
                  minHeight: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.3s",
                  backgroundColor: "#87CEFA",
                  "&:hover": {
                    boxShadow: 2,
                    backgroundColor: "#ADD8E6",
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Post a Job
                </Typography>
                <Typography variant="body2">
                  Create and manage job listings.
                </Typography>
              </Paper>
            </Link>
          </ProtectedRoute>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ProtectedRoute user={"user"}>
            <Link
              to="/labor/employers/view-applicants"
              style={{ textDecoration: "none" }}
            >
              <Paper
                sx={{
                  padding: { xs: 1, md: 1.5 },
                  minHeight: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.3s",
                  backgroundColor: "#FFA07A",
                  "&:hover": {
                    boxShadow: 2,
                    backgroundColor: "#FFB6C1",
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  View Applicants
                </Typography>
                <Typography variant="body2">
                  Review and manage job applications.
                </Typography>
              </Paper>
            </Link>
          </ProtectedRoute>
        </Grid>
      </Grid>

      {/* Additional Features Section */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: { xs: 4, md: 6 },
          marginBottom: { xs: 3, md: 4 },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: { xs: 1, md: 2 } }}
        >
          Explore More
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{ margin: { xs: 1, sm: "0 1rem" } }}
            component={Link}
            to="/labor/employers/statistics"
          >
            View Analytics
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ margin: { xs: 1, sm: "0 1rem" } }}
            component={Link}
            to="/labor/employers/help"
          >
            Help & Support
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default EmployersSection;
