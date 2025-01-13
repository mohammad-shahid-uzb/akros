import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import NavBar from "./components/Layout/Navbar";
import UserProvider from "./context/UserContext";
import AppRoutes from "./routes"; // Import the routes

import "./i18n";

function App() {
  return (
    <Router>
      <CssBaseline />
      <UserProvider>
        <NavBar />
        <Container>
          <AppRoutes /> {/* Use the imported routes */}
        </Container>
      </UserProvider>
    </Router>
  );
}

export default App;
