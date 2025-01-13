import React from "react";
import { Button, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const ShareButton = () => {
  // Define the onClick handler
  const handleShareClick = async () => {
    if (navigator.share) {
      // Web Share API is supported
      try {
        await navigator.share({
          title: "Check out this content!",
          text: "This is a great piece of content I'd like to share with you.",
          url: window.location.href, // You can replace this with any URL you want to share
        });
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log("Web Share API not supported. Copying to clipboard instead.");
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Button
      variant="outlined" // Use "contained" or "text" based on your design preference
      startIcon={<ShareIcon color="primary" />} // Place the icon at the start of the button
      onClick={handleShareClick} // Attach the onClick handler
      sx={{
        color: "primary.main",
        textTransform: "none",
        borderColor: "primary.main",
        "&:hover": {
          borderColor: "primary.dark",
          backgroundColor: "primary.light",
        },
        fontSize: { xs: 14, md: 16 },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontSize: { xs: 14, md: 16 } }} // Adjust font size based on screen size
      >
        Share
      </Typography>
    </Button>
  );
};

export default ShareButton;
