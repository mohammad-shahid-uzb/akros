// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Create UserContext
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null); // Store decoded JWT token
  const navigate = useNavigate();

  // Decode JWT token if available in localStorage
  useEffect(() => {
    const token = localStorage.getItem("oauthToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded); // Save decoded token
        console.log("Decoded Token:", decoded);
      } catch (error) {
        console.error("Failed to decode token:", error.message);
        localStorage.removeItem("oauthToken"); // Clear invalid token
      }
    }
  }, []);

  // Manage Firebase authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Handle user logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("oauthToken"); // Clear token on logout
        setDecodedToken(null);
        setUser(null);
        navigate("/"); // Redirect to home page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Provide user, decodedToken, and handleLogout to all children
  return (
    <UserContext.Provider value={{ user, decodedToken, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
