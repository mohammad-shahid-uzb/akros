import React, { useContext } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Assuming UserContext is in the right path

const Logout = () => {
  const { user, handleLogout, decodedToken } = useContext(UserContext); // Access user and handleLogout from context
  const navigate = useNavigate();

  // Determine the user name to display (from either decodedToken or user object)
  const userName = decodedToken?.username || user?.displayName || "Guest";

  const handleLogoutClick = () => {
    handleLogout(); // Call handleLogout to clear localStorage and Firebase user
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
        p: 4,
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Are you sure you want to log out?
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        You are logged in as {userName}.
      </Typography>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mr: 2,
            fontWeight: "bold",
            backgroundColor: "#0077b6",
            "&:hover": {
              backgroundColor: "#005f88",
            },
          }}
          onClick={handleLogoutClick} // Call logout handler
        >
          Yes, Logout
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            ml: 2,
            fontWeight: "bold",
            borderColor: "#0077b6",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
          onClick={() => navigate("/")} // Navigate to home on cancel
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;
