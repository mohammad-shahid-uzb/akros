import React from "react";
import { Box, Grid, Typography, Link, Button } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2E3B55", // Dark background similar to Procore
        color: "white",
        padding: "40px 20px",
        marginTop: "auto",
      }}
    >
      <Grid container spacing={4}>
        {/* Company Info Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            About Us
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Careers
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Press
          </Link>
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Features
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Pricing
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Integrations
          </Link>
        </Grid>

        {/* Support Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Support
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Help Center
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Contact Us
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            FAQs
          </Link>
        </Grid>

        {/* Legal & Social Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Legal
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          <br />
          <Box mt={2}>
            <Button color="inherit" sx={{ marginRight: 1 }}>
              Facebook
            </Button>
            <Button color="inherit" sx={{ marginRight: 1 }}>
              Twitter
            </Button>
            <Button color="inherit">LinkedIn</Button>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box textAlign="center" marginTop="20px">
        <Typography variant="body2">
          © {new Date().getFullYear()} Akros Consultancy Services. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
