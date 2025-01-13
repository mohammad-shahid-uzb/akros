import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { fetchTenderById } from "../services/tenderService"; // Import the fetch function

const TenderDetailPage = () => {
  const { id } = useParams(); // Get the tender ID from the URL
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery("(max-width:600px)"); // Detect if the screen width is mobile size

  // Fetch the tender data when the component is mounted or the ID changes
  useEffect(() => {
    const getTender = async () => {
      try {
        const fetchedTender = await fetchTenderById(id); // Fetch tender using the API function
        setTender(fetchedTender); // Set the fetched tender to state
      } catch (error) {
        console.error(`Failed to fetch tender with ID ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    getTender();
  }, [id]);

  // Display loading spinner while data is being fetched
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

  // Handle case where the tender is not found or doesn't exist
  if (!tender) {
    return (
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: 5 }}>
        Project not found!
      </Typography>
    );
  }

  // Destructure tender data for easier use in JSX
  const {
    title,
    country,
    sector,
    status,
    deadline,
    description,
    objectives = [], // Default to empty array if objectives are not present
  } = tender;

  return (
    <Box sx={{ padding: isMobile ? 2 : 5 }}>
      {/* Title Section */}
      <Typography
        variant={isMobile ? "h4" : "h3"}
        gutterBottom
        sx={{
          fontWeight: 600,
          color: "#2c3e50",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ marginBottom: isMobile ? 2 : 3 }} />

      {/* Main Content Section */}
      <Grid container spacing={isMobile ? 2 : 3} alignItems="stretch">
        {/* Left Section with Project Details */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              marginBottom: 3,
              boxShadow: 4,
              padding: 2,
              height: "100%", // Make this card stretch to 100% height
              display: "flex",
              flexDirection: "column", // Ensure the card content is in a column
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" color="primary" gutterBottom>
                Project Information
              </Typography>
              <Typography variant="body1">
                <strong>Country:</strong> {country}
              </Typography>
              <Typography variant="body1">
                <strong>Sector:</strong> {sector}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {status}
              </Typography>
              {deadline && (
                <Typography variant="body1">
                  <strong>Deadline:</strong>{" "}
                  {new Date(deadline).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Typography>
              )}
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 500, marginTop: 1 }}>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {description}
              </Typography>

              {/* Project Objectives */}
              {objectives.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Objectives
                  </Typography>
                  <ul style={{ paddingLeft: "20px" }}>
                    {objectives.map((objective, idx) => (
                      <li key={idx}>
                        <Typography variant="body1">{objective}</Typography>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Downloadable Documents */}
              {tender.documents && tender.documents.length > 0 ? (
                <Button
                  size="small"
                  color="secondary"
                  href={`${process.env.REACT_APP_BACKEND_URL}${tender.documents[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ marginTop: 2 }}
                >
                  Download Document
                </Button>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No documents available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Section with Contact Information */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              marginBottom: 3,
              boxShadow: 4,
              padding: 2,
              height: "100%", // Make this card stretch to 100% height
              display: "flex",
              flexDirection: "column", // Ensure the card content is in a column
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                color="secondary"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Contact Information
              </Typography>
              {/* Hardcoded Name and Email Information */}
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Name:</strong> John Doe
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Email:</strong> john.doe@example.com
              </Typography>

              {/* Additional Note */}
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: 2, fontStyle: "italic" }}
              >
                For a more in-depth discussion or specific inquiries regarding
                this tender, please send us an email. Our team is equipped to
                provide technical insights and detailed information to support
                your business goals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Back to Projects Button */}
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
          sx={{ fontWeight: "bold" }}
        >
          Back to Projects
        </Button>
      </Box>
    </Box>
  );
};

export default TenderDetailPage;
