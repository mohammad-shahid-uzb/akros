import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo1.png";
import { UserContext } from "../../context/UserContext";

const NavBar = () => {
  const { user, decodedToken } = useContext(UserContext); // Access user and decodedToken from context
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleUserClick = (event) => setAnchorElUser(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorElUser(null);
  };

  const handleLanguageChange = (lng) => i18n.changeLanguage(lng);

  // Check if user is logged in (either through Firebase or decodedToken)
  const isLoggedIn = user || decodedToken;

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Logo and Company Name */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="Akros Logo"
              style={{ height: "100%", maxHeight: "64px", marginRight: "10px" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h4"
                sx={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: "#00796b",
                }}
              >
                Akros
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#FFA500",
                  fontWeight: "medium",
                  fontStyle: "italic",
                }}
              >
                {t("Centralized Construction Data")}
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Divider between logo and menu on desktop */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, display: { xs: "none", md: "block" } }}
        />

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                key="home"
                onClick={handleMenuClose}
                component={Link}
                to="/"
              >
                {t("Home")}
              </MenuItem>
              {!isLoggedIn ? (
                <>
                  <MenuItem
                    key="login"
                    onClick={handleMenuClose}
                    component={Link}
                    to="/login"
                  >
                    {t("Login")}
                  </MenuItem>
                  <MenuItem
                    key="signup"
                    onClick={handleMenuClose}
                    component={Link}
                    to="/signup"
                  >
                    {t("Signup")}
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem key="username" disabled>
                    {user?.displayName ||
                      decodedToken?.username ||
                      decodedToken?.email.slice(0, 6) ||
                      "User"}
                  </MenuItem>
                  <MenuItem
                    key="logout"
                    onClick={() => {
                      navigate("/logout");
                      handleMenuClose();
                    }}
                  >
                    {t("Logout")}
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              {t("Home")}
            </Button>
            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleUserClick}
                  endIcon={<ArrowDropDownIcon />}
                >
                  {user?.displayName ||
                    decodedToken?.username ||
                    decodedToken?.email.slice(0, 6) ||
                    "User"}
                </Button>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/logout");
                      handleMenuClose();
                    }}
                  >
                    {t("Logout")}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  {t("Login")}
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  {t("Signup")}
                </Button>
              </>
            )}
          </>
        )}

        {/* Language Selection */}
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
          <Button color="inherit" onClick={() => handleLanguageChange("en")}>
            EN
          </Button>
          <Button color="inherit" onClick={() => handleLanguageChange("uz")}>
            UZ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
