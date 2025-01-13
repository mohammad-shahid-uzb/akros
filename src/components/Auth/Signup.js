import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { auth } from "../../firebase";
import axios from "../../hooks/useAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import TelegramIcon from "@mui/icons-material/Telegram";
import GoogleIcon from "@mui/icons-material/Google";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleEmailSignup = async () => {
    // Validate inputs
    if (!email || !password) {
      setMessage("Both email and password are required.");
      return;
    }

    // Clear any previous messages
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("/signup", {
        email: email,
        password: password,
      });

      // Mock delay for API simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful signup
      localStorage.setItem("oauthToken", response.data.oauthToken);
      setMessage("Signup successful! Redirecting...");
      window.location.href = "/";
    } catch (error) {
      console.error("Signup failed:", error);

      // Handle errors based on response from API
      if (error.response && error.response.data) {
        setMessage(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBotLinkClick = () => {
    navigate("/telegram-verify");
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        email: user.email,
        name: user.displayName,
        googleId: user.uid, // Firebase UID
        isAdmin: false,
      };

      // Send user data to your backend
      const response = await axios.post(
        "/google-signup",
        JSON.stringify(userData), // Pass the data as a JSON string
        {
          headers: {
            "Content-Type": "application/json", // Set the content type header
          },
        }
      );
      console.log("response signup", response.statusText);
      if (response.statusText === "OK") {
        localStorage.setItem("oauthToken", response.data.oauthToken);
        setMessage("Signup successful! Redirecting...");
        window.location.href = "/";
      } else {
        const { message } = await response.json();
        console.error("Error during Google signup:", message);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const botDeepLink = "https://t.me/AkrosUserSignBot?start=ref_from_web";

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 5,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      {/* Email/Password Signup */}
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailSignup();
        }}
        sx={{ mt: 3 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: "bold",
          }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
      </Box>
      {message && (
        <Alert
          severity={message.includes("successful") ? "success" : "error"}
          sx={{ mt: 2 }}
        >
          {message}
        </Alert>
      )}
      <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
        <Divider sx={{ flexGrow: 1, borderBottomWidth: 2 }} />
        <Typography
          variant="body1"
          sx={{ mx: 2, color: "text.secondary", fontWeight: "bold" }}
        >
          OR
        </Typography>
        <Divider sx={{ flexGrow: 1, borderBottomWidth: 2 }} />
      </Box>

      {/* Telegram Bot Signup */}
      <Button
        href={botDeepLink}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleBotLinkClick}
        sx={{
          py: 1.5,
          fontWeight: "bold",
          marginBottom: 1.5,
        }}
        startIcon={<TelegramIcon />}
      >
        Sign Up with Telegram
      </Button>

      {/* Google Signup */}
      <Button
        variant="outlined"
        color="error"
        fullWidth
        onClick={handleGoogleSignup}
        sx={{
          py: 1.5,
          fontWeight: "bold",
        }}
        startIcon={<GoogleIcon />}
      >
        Sign Up with Google
      </Button>

      {/* Login Option */}
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            color="primary"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Log In
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupPage;
