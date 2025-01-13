// components/Auth/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext); // Access user directly from context

  // If user is logged in, redirect to the dashboard or home page
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, allow access to the route
  return children;
};

export default ProtectedRoute;
