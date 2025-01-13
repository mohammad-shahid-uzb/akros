import React from "react";
import { Box, Typography, Grid, Paper, Button, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import Features from "./HomePageSubSection";
import Footer from "../components/Layout/Footer";
import banner from "../assets/banner.png";
import AR from "../assets/A&R.webp";
import NewsFeed from "../assets/NewsFeed.webp";
import market from "../assets/market.webp";
import investor from "../assets/investor.webp";
import law from "../assets/law.webp";
import finance from "../assets/finance.webp";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          // background: "linear-gradient(to right, #008080, #00CED1)", // Teal to Cyan gradient
          background: "linear-gradient(to right, #000080, #87CEEB)", // Navy to Sky Blue
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Soft black shadow
          fontWeight: "bold",
          animation: "textPop 1.5s ease",
          "@keyframes textPop": {
            "0%": { transform: "scale(0.9)", opacity: 0 },
            "100%": { transform: "scale(1)", opacity: 1 },
          },
          fontSize: {
            xs: "2rem", // For mobile devices
            sm: "3rem", // For tablets
            md: "4rem", // For small laptops
            lg: "5rem", // For desktops
          },
          textAlign: "center", // Center text on smaller screens
        }}
      >
        {t("welcome")}
      </Typography>
      {/* Enhanced Subtitle with Fade-in Effect */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#555",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          animation: "fadeIn 2s ease",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
          fontSize: {
            xs: "1rem", // For mobile devices
            sm: "1.5rem", // For tablets
            md: "2rem", // For small laptops
            lg: "2.5rem", // For desktops
          },
          textAlign: "center", // Center text on smaller screens
        }}
      >
        {t("subtitle")}
      </Typography>
      {/* Banner Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "200px", sm: "400px" },
          backgroundImage: `url(${banner})`, // Update with your banner image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          marginBottom: 4,
        }}
      />

      {/* Features Section */}
      <Features />

      {/* New Section: Services */}
      <Box sx={{ marginY: 8, paddingX: 2 }}>
        <Typography variant="h3" align="center" gutterBottom>
          {t("Our Solutions")}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                position: "relative",
                width: "100%",
                height: 300,
                padding: 1,
                textAlign: "center",
                boxShadow: 1,
                overflow: "hidden",
              }}
            >
              <img
                src="/CostAnalysis.webp" // Replace with the path to your image
                alt="Cost Analysis"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  // zIndex: -1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px", // Adjust padding as needed
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
                  color: "#fff", // White text color // Optional: Add a background color with opacity
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {t("Cost Analysis")}
                </Typography>
                <Typography variant="body1">
                  {t("service1Description")}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                position: "relative",
                width: "100%",
                height: 300,
                padding: 1,
                textAlign: "center",
                boxShadow: 1,
                overflow: "hidden",
              }}
            >
              <img
                src={AR} // Replace with the path to your image
                alt="Market Analysis"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  // zIndex: -1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px", // Adjust padding as needed
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
                  color: "#fff", // White text color // Optional: Add a background color with opacity
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {t("Market Analysis")}
                </Typography>
                <Typography variant="body1">
                  {t("service1Description")}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                position: "relative",
                width: "100%",
                height: 300,
                padding: 1,
                textAlign: "center",
                boxShadow: 1,
                overflow: "hidden",
              }}
            >
              <img
                src={NewsFeed} // Replace with the path to your image
                alt="Construction News"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  // zIndex: -1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px", // Adjust padding as needed
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
                  color: "#fff", // White text color // Optional: Add a background color with opacity
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {t("Construction News")}
                </Typography>
                <Typography variant="body1">
                  {t("service1Description")}
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* New Section: Testimonials */}
      <Box sx={{ marginBottom: 4 }}>
        {/* Market Overview */}
        <Grid container spacing={4} alignItems="center">
          {/* Image on the left, text on the right */}
          <Grid item xs={12} sm={6}>
            <img
              src={market} // Replace with actual image
              alt="Market Overview"
              style={{ width: "100%", height: "auto", marginBottom: 16 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Market Overview
            </Typography>
            <Typography variant="body1" style={{ textAlign: "justify" }}>
              Stay informed with comprehensive, tailored reports designed
              specifically for your business needs. We provide in-depth analysis
              covering the latest trends, key sectors like residential,
              commercial, and industrial projects, as well as the impact of
              emerging technologies and sustainable building practices. Our
              expert reports also delve into the latest government initiatives,
              regulations, and incentives shaping the construction landscape.
            </Typography>
          </Grid>
        </Grid>

        {/* Opportunities for Investment */}
        <Grid container spacing={4} alignItems="center" sx={{ marginTop: 4 }}>
          {/* Text on the left, image on the right */}
          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
            <Typography variant="h5" gutterBottom>
              Opportunities for Investment
            </Typography>
            <Typography variant="body1" style={{ textAlign: "justify" }}>
              We provide detailed, tailored reports that highlight the latest
              investment opportunities, government incentives, and regulatory
              frameworks. Our insights are designed to help you navigate
              Uzbekistan’s evolving business landscape, ensuring you make
              informed decisions and capitalize on strategic growth areas.
              Whether you’re interested in large-scale infrastructure projects
              or cutting-edge technology ventures, we offer the expertise you
              need to succeed.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
            <img
              src={investor} // Replace with actual image
              alt="Investment Opportunities"
              style={{ width: "100%", height: "auto", marginBottom: 16 }}
            />
          </Grid>
        </Grid>

        {/* Legal and Regulatory Framework */}
        <Grid container spacing={4} alignItems="center" sx={{ marginTop: 4 }}>
          {/* Image on the left, text on the right */}
          <Grid item xs={12} sm={6}>
            <img
              src={law} // Replace with actual image
              alt="Legal Framework"
              style={{ width: "100%", height: "auto", marginBottom: 16 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Legal and Regulatory Framework
            </Typography>
            <Typography variant="body1" style={{ textAlign: "justify" }}>
              Gain comprehensive insights into the laws governing foreign
              investments, ownership structures, and regulatory requirements for
              construction projects in Uzbekistan. Our web portal provides
              up-to-date information on legal frameworks, helping investors
              navigate the complexities of foreign ownership, compliance with
              local regulations, and securing the necessary approvals for
              construction ventures. Stay informed and ensure your projects
              align with the country's investment policies and legal standards.
            </Typography>
          </Grid>
        </Grid>

        {/* Financial Insights */}
        <Grid container spacing={4} alignItems="center" sx={{ marginTop: 4 }}>
          {/* Text on the left, image on the right */}
          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
            <Typography variant="h5" gutterBottom>
              Financial Insights
            </Typography>
            <Typography variant="body1" style={{ textAlign: "justify" }}>
              Our team uses advanced financial modeling and data-driven insights
              to provide you with a clear understanding of project viability,
              profitability, and potential risks. By combining cutting-edge
              financial analysis tools and industry-specific expertise, we
              deliver precise metrics that are crucial for informed
              decision-making. From cost analysis to ROI forecasts, we offer a
              comprehensive view of your project's financial landscape.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
            <img
              src={finance} // Replace with actual image
              alt="Financial Insights"
              style={{ width: "100%", height: "auto", marginBottom: 16 }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
          padding: 4,
          backgroundColor: "#e0f7fa", // Light cyan background for freshness
          color: "#004d40", // Dark teal text for contrast
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "2.5rem" },
            color: "#00796b", // Teal for the title
          }}
        >
          Discover the Future of the Construction Industry
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            maxWidth: "800px",
            margin: "0 auto",
            color: "#004d40", // Dark teal for the subtitle
          }}
        >
          Explore cutting-edge solutions, expert insights, and investment
          opportunities that can transform your next project.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            marginTop: 3,
            paddingX: 4,
          }}
        >
          Get Started
        </Button>
      </Box>

      <Divider sx={{ marginY: 4 }} />

      {/* Additional Content or Sections */}

      {/* You can add more sections like a blog, news, contact info, etc. */}

      <Footer />
    </Box>
  );
};

export default HomePage;
