import React, { useState } from "react";
import axios from "../../hooks/useAuth";
//import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const TelegramVerification = () => {
  const [userId, setUserId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/telegram/verify/code", {
        userId,
        code: verificationCode,
      });
      localStorage.setItem("oauthToken", response.data.oauthToken);
      window.location.href = "/";
    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
          width: "100%",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Enter Verification Details
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <TextField
            label="Telegram User ID"
            variant="outlined"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Verification Code"
            variant="outlined"
            fullWidth
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Verify
          </Button>
        </form>
        {message && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default TelegramVerification;
