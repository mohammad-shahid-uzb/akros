import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Grid,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ShareButton from "./ShareButton";

// Function to format date to "09 Sept 2024" using Intl.DateTimeFormat
const formatDate = (dateString) => {
  if (!dateString) return "Date not available";
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};

const VendorTopCard = ({ Vendor = {} }) => {
  const [activeTab, setActiveTab] = useState(0);
  //const lastUpdateDate = Vendor?.lastUpdate || "Not Available"; // Default value for last updated date

  const navigate = useNavigate(); // Create navigate function

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          maxWidth: "900px",
          margin: "auto",
          padding: { xs: 2, md: 3 },
          borderRadius: "16px",
          boxShadow: 4,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Vendor Logo and Information */}
          <Grid item xs={12} md={2} display="flex" justifyContent="center">
            <Avatar
              alt="Vendor Logo"
              src={`${process.env.REACT_APP_BACKEND_URL}${
                Vendor?.imageUrl || ""
              }`}
              sx={{
                width: { xs: 70, md: 100 },
                height: { xs: 70, md: 100 },
                borderRadius: "18px",
                border: "2px solid #1976d2",
                boxShadow: 3,
              }}
            />
          </Grid>

          {/* Vendor Name and Location */}
          <Grid
            item
            xs={12}
            md={8}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                mb: 1,
                fontSize: { xs: 16, md: 24 },
                overflowWrap: "break-word",
              }}
            >
              {Vendor?.name || "Vendor Name"}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontSize: { xs: 12, md: 16 } }}
            >
              {Vendor?.location || "Vendor Location"}
            </Typography>
          </Grid>

          {/* Share Button */}
          <Grid
            item
            xs={12}
            md={2}
            display="flex"
            justifyContent={{ xs: "center", md: "flex-end" }}
            sx={{ mt: { xs: 2, md: 0 } }}
          >
            <ShareButton />
          </Grid>
        </Grid>

        {/* Button Section */}
        <CardActions
          sx={{
            justifyContent: { xs: "center", md: "flex-start" },
            mt: 2,
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              marginRight: { xs: 0, md: 2 },
              marginBottom: { xs: 1, md: 0 },
              textTransform: "none",
              borderRadius: "8px",
              boxShadow: 3,
              width: { xs: "100%", md: "auto" },
            }}
          >
            Request Quote
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            sx={{
              marginRight: { xs: 0, md: 2 },
              marginBottom: { xs: 1, md: 0 },
              textTransform: "none",
              borderRadius: "8px",
              width: { xs: "100%", md: "auto" },
            }}
          >
            Pre-Qual
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              width: { xs: "100%", md: "auto" },
            }}
          >
            Brochure
          </Button>

          {/* Last Updated Date */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 0.5, marginLeft: { xs: 0, md: 2 } }}
          >
            Last updated: {formatDate(Vendor.lastUpdated)}
          </Typography>
        </CardActions>

        {/* Tabs Section */}
        <Box sx={{ borderBottom: 2, borderColor: "divider", mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                width: "100%",
                ".MuiTabs-flexContainer": { justifyContent: "left" },
              }}
            >
              <Tab
                label="Home"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 12, md: 16 },
                  minWidth: 0,
                  px: 2,
                }}
              />
              <Tab
                label="Contact Us"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 12, md: 16 },
                  minWidth: 0,
                  px: 2,
                }}
              />
              <Tab
                label="Qualifications"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 12, md: 16 },
                  minWidth: 0,
                  px: 2,
                }}
              />
            </Tabs>
          </Box>
        </Box>

        {/* Content Sections based on Active Tab */}
        {activeTab === 0 && (
          <Box sx={{ mt: 4 }}>
            {/* Our Story Card */}
            <Card
              sx={{
                margin: 2,
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  {Vendor?.ourStory?.title || "Our Story"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Vendor?.ourStory?.content ||
                    "This is where the vendor's story will be displayed."}
                </Typography>
              </CardContent>
            </Card>

            {/* What We Do Card */}
            <Card
              sx={{
                margin: 2,
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  {Vendor?.whatWeDo?.title || "What We Do"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Vendor?.whatWeDo?.content ||
                    "This is where the vendor's activities and offerings will be displayed."}
                </Typography>
              </CardContent>
            </Card>

            {/* Commercial Experience Card */}
            <Card
              sx={{
                margin: 2,
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  {Vendor?.commercialExperience?.title ||
                    "Commercial Experience"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Vendor?.commercialExperience?.content ||
                    "This is where the vendor's commercial experience will be displayed."}
                </Typography>
              </CardContent>
            </Card>

            {/* Regions Serviced Card */}
            <Card
              sx={{
                margin: 2,
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  {Vendor?.regionsServiced?.title || "Regions Serviced"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Vendor?.regionsServiced?.content ||
                    "This is where the regions serviced by the vendor will be displayed."}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ mt: 4 }}>
            {console.log("Vendor Locations: ", Vendor.contacts)}

            {/* Contact Information Card */}
            <Card
              sx={{
                margin: 2,
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  Contact Information
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, fontWeight: "medium" }}
                >
                  Email: {Vendor?.contacts?.email || "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, fontWeight: "medium" }}
                >
                  Phone: {Vendor?.contacts?.phone || "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, fontWeight: "medium" }}
                >
                  Telegram: {Vendor?.contacts?.telegram || "N/A"}
                </Typography>
              </CardContent>
            </Card>

            {/* Locations Card */}
            <Card
              sx={{
                margin: 2,
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  Locations
                </Typography>
                {Vendor?.contacts.locations?.map((location, index) => {
                  console.log(location); // Logs each location to the console
                  return (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{ mt: 1, fontWeight: "medium" }}
                    >
                      {`${index + 1}. ${location}`}
                    </Typography>
                  );
                })}
              </CardContent>
            </Card>

            {/* Key Contacts Card */}
            <Card
              sx={{
                margin: 2,
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  Key Contacts
                </Typography>
                {Vendor?.contacts.keyContacts?.map((contact, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "medium", color: "#1976d2" }}
                    >
                      {`No: ${index + 1}`}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      Name: {contact.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      Position: {contact.position}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      Phone: {contact.phone}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      Email: {contact.email}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ mt: 4 }}>
            <Card
              sx={{
                margin: 2,
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: 16, md: 20 },
                  }}
                >
                  {Vendor?.qualificationsData?.title || "Qualifications"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Vendor?.qualificationsData?.content ||
                    "This is where the vendor's qualifications will be displayed."}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Go Back Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)} // Go back to the previous page
          sx={{
            margin: 2,
            textTransform: "none",
            borderRadius: "8px",
            boxShadow: 3,
            width: { xs: "100%", md: "auto" },
            fontWeight: "bold",
            fontSize: { xs: 14, md: 16 },
          }}
        >
          Go Back
        </Button>
      </Card>
    </Box>
  );
};

export default VendorTopCard;
