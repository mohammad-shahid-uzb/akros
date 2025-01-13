import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "../../hooks/useAuth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust path if needed
import { Google as GoogleIcon } from "@mui/icons-material";
import { FaTelegramPlane } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Call your custom backend route
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });

      // Retrieve the JWT token from the response
      const { oauthToken } = response.data;

      // Optionally, store the token in localStorage
      localStorage.setItem("oauthToken", oauthToken);

      // If desired, decode the token or store user data in context
      // e.g., setUser(decodedUserInfo) if you decode the token

      setErrorMessage(""); // Clear any previous errors
      window.location.href = "/"; // Redirect to home
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data) {
        // Show error from server if available
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "Failed to log in. Check your credentials and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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

  const handleTelegramLogin = () => {
    navigate("/telegram-verify");
  };

  const botDeepLink = "https://t.me/AkrosUserSignBot?start=ref_from_web";

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        p: 4,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {loading && <CircularProgress />}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Box component="form" onSubmit={handleEmailLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          Login with Email
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </Grid>
        {message && (
          <Alert
            severity={message.includes("successful") ? "success" : "error"}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
        <Grid item xs={12} sm={6}>
          <Button
            href={botDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<FaTelegramPlane />}
            onClick={handleTelegramLogin}
          >
            Login with Telegram
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
