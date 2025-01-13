import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Typography } from "@mui/material";
//import Vendors from "./vendor/VendorListings";

import {
  Reporting,
  Risk,
  Resource,
  Planing,
  BIM,
  Market,
} from "../assets/index";

// Define an array of colors
const colors = [
  "#87CEFA",
  "#FFA07A",
  "#98FB98",
  "#FFB6C1",
  "#FFD700",
  "#AFEEEE",
];

function Features() {
  return (
    <Grid container spacing={3} marginBottom={4}>
      {/* Feature One */}
      <Grid item xs={12} sm={6} md={4}>
        <Link
          to="/vendors" // Unique route for Feature One
          style={{ textDecoration: "none" }} // Remove the underline on the link
        >
          <Paper
            sx={{
              position: "relative", // For absolute positioning inside
              minHeight: "200px",
              cursor: "pointer", // Make it look like a button
              transition: "0.3s", // Smooth hover effect
              backgroundColor: colors[1 % colors.length], // Assign different colors based on index
              "&:hover": {
                boxShadow: 3, // Add hover shadow
                backgroundColor: "#ADD8E6", // Lighter shade of sky blue on hover (optional)
              },
            }}
          >
            <Box
              sx={{ position: "relative", overflow: "hidden", height: "200px" }}
            >
              <img
                src={Risk} // Direct path from the public folder
                alt="Market"
                style={{
                  position: "absolute", // Ensure image covers the entire box
                  top: 0,
                  left: 0,
                  height: "100%", // Cover the full height of the parent container
                  width: "100%", // Cover the full width of the parent container
                  objectFit: "cover", // Ensure the image retains its aspect ratio
                  borderRadius: "4px", // Optional: rounded corners
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)", // Optional overlay effect
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Vendor Listings
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "justify", // Justify text alignment
                  fontSize: { xs: "1rem", sm: "1rem", md: "1rem" }, // Responsive font size based on screen size
                  lineHeight: 1.6, // Optional: Adjust line height for readability
                }}
              >
                Leading contractors, suppliers, and specialists in urban
                development, delivering innovative residential and commercial
                projects.
              </Typography>
            </Box>
          </Paper>
        </Link>
      </Grid>

      {/* Feature Two */}
      <Grid item xs={12} sm={6} md={4}>
        <Link
          to="/materials" // Unique route for Feature One
          style={{ textDecoration: "none" }} // Remove the underline on the link
        >
          <Paper
            sx={{
              position: "relative", // For absolute positioning inside
              minHeight: "200px",
              cursor: "pointer", // Make it look like a button
              transition: "0.3s", // Smooth hover effect
              backgroundColor: colors[1 % colors.length], // Assign different colors based on index
              "&:hover": {
                boxShadow: 3, // Add hover shadow
                backgroundColor: "#ADD8E6", // Lighter shade of sky blue on hover (optional)
              },
            }}
          >
            <Box
              sx={{ position: "relative", overflow: "hidden", height: "200px" }}
            >
              <img
                src={Market} // Direct path from the public folder
                alt="Market"
                style={{
                  position: "absolute", // Ensure image covers the entire box
                  top: 0,
                  left: 0,
                  height: "100%", // Cover the full height of the parent container
                  width: "100%", // Cover the full width of the parent container
                  objectFit: "cover", // Ensure the image retains its aspect ratio
                  borderRadius: "4px", // Optional: rounded corners
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)", // Optional overlay effect
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Material Price Insights
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "justify", // Justify text alignment
                  fontSize: { xs: "1rem", sm: "1rem", md: "1rem" }, // Responsive font size based on screen size
                  lineHeight: 1.6, // Optional: Adjust line height for readability
                }}
              >
                "Comprehensive details on high-quality market materials,
                offering innovative solutions for residential and commercial
                construction projects."
              </Typography>
            </Box>
          </Paper>
        </Link>
      </Grid>

      {/* Feature Three */}
      <Grid item xs={12} sm={6} md={4}>
        <Link
          to="/workforce" // Unique route for Feature One
          style={{ textDecoration: "none" }} // Remove the underline on the link
        >
          <Paper
            sx={{
              position: "relative", // For absolute positioning inside
              minHeight: "200px",
              cursor: "pointer", // Make it look like a button
              transition: "0.3s", // Smooth hover effect
              backgroundColor: colors[1 % colors.length], // Assign different colors based on index
              "&:hover": {
                boxShadow: 3, // Add hover shadow
                backgroundColor: "#ADD8E6", // Lighter shade of sky blue on hover (optional)
              },
            }}
          >
            <Box
              sx={{ position: "relative", overflow: "hidden", height: "200px" }}
            >
              <img
                src={Resource} // Direct path from the public folder
                alt="Market"
                style={{
                  position: "absolute", // Ensure image covers the entire box
                  top: 0,
                  left: 0,
                  height: "100%", // Cover the full height of the parent container
                  width: "100%", // Cover the full width of the parent container
                  objectFit: "cover", // Ensure the image retains its aspect ratio
                  borderRadius: "4px", // Optional: rounded corners
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)", // Optional overlay effect
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Labor Data
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "justify", // Justify text alignment
                  fontSize: { xs: "1rem", sm: "1rem", md: "1rem" }, // Responsive font size based on screen size
                  lineHeight: 1.6, // Optional: Adjust line height for readability
                }}
              >
                Comprehensive workforce solutions, connecting skilled
                professionals with innovative opportunities for residential and
                commercial construction projects.
              </Typography>
            </Box>
          </Paper>
        </Link>
      </Grid>

      {/* Feature Four */}
      <Grid item xs={12} sm={6} md={4}>
        <Link
          to="/news" // Unique route for Feature One
          style={{ textDecoration: "none" }} // Remove the underline on the link
        >
          <Paper
            sx={{
              position: "relative", // For absolute positioning inside
              minHeight: "200px",
              cursor: "pointer", // Make it look like a button
              transition: "0.3s", // Smooth hover effect
              backgroundColor: colors[1 % colors.length], // Assign different colors based on index
              "&:hover": {
                boxShadow: 3, // Add hover shadow
                backgroundColor: "#ADD8E6", // Lighter shade of sky blue on hover (optional)
              },
            }}
          >
            <Box
              sx={{ position: "relative", overflow: "hidden", height: "200px" }}
            >
              <img
                src={Reporting} // Direct path from the public folder
                alt="Market"
                style={{
                  position: "absolute", // Ensure image covers the entire box
                  top: 0,
                  left: 0,
                  height: "100%", // Cover the full height of the parent container
                  width: "100%", // Cover the full width of the parent container
                  objectFit: "cover", // Ensure the image retains its aspect ratio
                  borderRadius: "4px", // Optional: rounded corners
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)", // Optional overlay effect
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                News and Regulatory Updates
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "justify", // Justify text alignment
                  fontSize: { xs: "1rem", sm: "1rem", md: "1rem" }, // Responsive font size based on screen size
                  lineHeight: 1.6, // Optional: Adjust line height for readability
                }}
              >
                Stay informed with the latest news and regulatory updates,
                offering critical insights for residential and commercial
                construction projects.
              </Typography>
            </Box>
          </Paper>
        </Link>
      </Grid>

      {/* Feature Five */}
      <Grid item xs={12} sm={6} md={4}>
        <Link
          to="/tenders" // Unique route for Feature One
          style={{ textDecoration: "none" }} // Remove the underline on the link
        >
          <Paper
            sx={{
              position: "relative", // For absolute positioning inside
              minHeight: "200px",
              cursor: "pointer", // Make it look like a button
              transition: "0.3s", // Smooth hover effect
              backgroundColor: colors[1 % colors.length], // Assign different colors based on index
              "&:hover": {
                boxShadow: 3, // Add hover shadow
                backgroundColor: "#ADD8E6", // Lighter shade of sky blue on hover (optional)
              },
            }}
          >
            <Box
              sx={{ position: "relative", overflow: "hidden", height: "200px" }}
            >
              <img
                src={Planing} // Direct path from the public folder
                alt="Market"
                style={{
                  position: "absolute", // Ensure image covers the entire box
                  top: 0,
                  left: 0,
                  height: "100%", // Cover the full height of the parent container
                  width: "100%", // Cover the full width of the parent container
                  objectFit: "cover", // Ensure the image retains its aspect ratio
                  borderRadius: "4px", // Optional: rounded corners
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)", // Optional overlay effect
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Current Tenders
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "justify", // Justify text alignment
                  fontSize: { xs: "1rem", sm: "1rem", md: "1rem" }, // Responsive font size based on screen size
                  lineHeight: 1.6, // Optional: Adjust line height for readability
                }}
              >
                Explore current tenders with detailed insights, providing
                opportunities for residential and commercial construction
                projects.
              </Typography>
            </Box>
          </Paper>
        </Link>
      </Grid>

      {/* Feature Six */}
      <Grid item xs={12} sm={6} md={4}>
        <Link
          to="/projectmanagement" // Unique route for Feature One
          style={{ textDecoration: "none" }} // Remove the underline on the link
        >
          <Paper
            sx={{
              position: "relative", // For absolute positioning inside
              minHeight: "200px",
              cursor: "pointer", // Make it look like a button
              transition: "0.3s", // Smooth hover effect
              backgroundColor: colors[1 % colors.length], // Assign different colors based on index
              "&:hover": {
                boxShadow: 3, // Add hover shadow
                backgroundColor: "#ADD8E6", // Lighter shade of sky blue on hover (optional)
              },
            }}
          >
            <Box
              sx={{ position: "relative", overflow: "hidden", height: "200px" }}
            >
              <img
                src={BIM} // Direct path from the public folder
                alt="Market"
                style={{
                  position: "absolute", // Ensure image covers the entire box
                  top: 0,
                  left: 0,
                  height: "100%", // Cover the full height of the parent container
                  width: "100%", // Cover the full width of the parent container
                  objectFit: "cover", // Ensure the image retains its aspect ratio
                  borderRadius: "4px", // Optional: rounded corners
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)", // Optional overlay effect
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Project Management Tools
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "justify", // Justify text alignment
                  fontSize: { xs: "1rem", sm: "1rem", md: "1rem" }, // Responsive font size based on screen size
                  lineHeight: 1.6, // Optional: Adjust line height for readability
                }}
              >
                Efficient project management tools designed to streamline
                planning, execution, and tracking for residential and commercial
                construction projects.
              </Typography>
            </Box>
          </Paper>
        </Link>
      </Grid>

      {/* Repeat for other features */}
    </Grid>
  );
}

export default Features;
