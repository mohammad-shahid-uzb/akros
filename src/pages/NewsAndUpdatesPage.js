import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Paper,
  Link,
  List,
  ListItem,
  Grid,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import Footer from "../components/Layout/Footer";

const NewsAndUpdatesPage = () => {
  const { t } = useTranslation();
  const [filteredItems, setFilteredItems] = useState([]);
  const [favorites, setFavorites] = useState([]); // State to store favorites
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("technology");
  const [startDate, setStartDate] = useState(moment().subtract(1, "months"));
  const [endDate, setEndDate] = useState(moment());
  const [selectedSource, setSelectedSource] = useState("");
  const [articleType, setArticleType] = useState("");
  const [email, setEmail] = useState("");

  const itemsPerPage = 20;
  const API_URL = "http://localhost:5000/api/news"; // Backend API URL

  // Fetch main news items from the backend
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Create the query parameters to pass to your backend
        const params = new URLSearchParams({
          q: searchQuery,
          from: startDate.format("YYYY-MM-DD"),
          to: endDate.format("YYYY-MM-DD"),
          sources: selectedSource,
          articleType: articleType,
        });

        // Make a request to your backend API
        const response = await axios.get(`${API_URL}?${params}`);

        // Log the response to see its structure
        console.log("Backend response:", response.data);

        // Assuming your backend returns data in a similar format to the external API
        setFilteredItems(response.data.articles.slice(0, itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch news from backend:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery, startDate, endDate, selectedSource, articleType]);

  // Handle toggle favorite logic
  const handleFavoriteToggle = (item) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((fav) => fav.title === item.title);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.title !== item.title);
      }
      return [...prevFavorites, item];
    });
  };

  // Handle newsletter signup
  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter signup email:", email);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          {/* Left panel for filters */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#edf4fb",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#1976d2",
                  textAlign: "center",
                  padding: "12px",
                  backgroundColor: "#e3f2fd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  mb: 3,
                }}
              >
                {t("Filters")}
              </Typography>

              {/* Search Query Input */}
              <TextField
                label={t("Search Query")}
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 3, height: "50px" }}
                InputProps={{ sx: { height: "45px" } }}
              />

              {/* Start Date Picker */}
              <DatePicker
                label={t("Start Date")}
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ mb: 3 }} />
                )}
                InputProps={{ sx: { height: "45px" } }}
              />

              {/* End Date Picker */}
              <DatePicker
                label={t("End Date")}
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ mb: 3, mt: 3 }} />
                )}
                InputProps={{ sx: { height: "45px" } }}
                sx={{ mt: 2 }}
              />

              {/* Source Dropdown */}
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <InputLabel>{t("Source")}</InputLabel>
                <Select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  label={t("Source")}
                >
                  <MenuItem value="">
                    <em>{t("None")}</em>
                  </MenuItem>
                  <MenuItem value="bbc-news">{t("BBC News")}</MenuItem>
                  <MenuItem value="cnn">{t("CNN")}</MenuItem>
                </Select>
              </FormControl>

              {/* Article Type Dropdown */}
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("Article Type")}</InputLabel>
                <Select
                  value={articleType}
                  onChange={(e) => setArticleType(e.target.value)}
                  label={t("Article Type")}
                >
                  <MenuItem value="">
                    <em>{t("All")}</em>
                  </MenuItem>
                  <MenuItem value="blog">{t("Blogs")}</MenuItem>
                  <MenuItem value="news">{t("News")}</MenuItem>
                </Select>
              </FormControl>
            </Paper>
            <Divider sx={{ my: 3 }} />
          </Grid>

          {/* Middle panel for news articles */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  color: "#ff6961",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                {t("News Feed")}
              </Typography>

              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : filteredItems.length > 0 ? (
                <List
                  sx={{ width: "100%", maxHeight: "75vh", overflow: "auto" }}
                >
                  {filteredItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          p: 2,
                          borderRadius: "8px",
                          backgroundColor: "white",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ width: "100%" }}>
                          <Typography variant="h6">{item.title}</Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            {t("publishedOn", {
                              date: item.publishedAt
                                ? moment(item.publishedAt).format("LL")
                                : "",
                            })}
                          </Typography>
                          <Typography variant="body2">
                            {item.description}
                          </Typography>
                          <Link
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: "#1976d2",
                              textDecoration: "underline",
                            }}
                          >
                            {t("Read More")}
                          </Link>
                        </Box>
                        <IconButton
                          onClick={() => handleFavoriteToggle(item)}
                          sx={{ ml: 2 }}
                        >
                          <FavoriteIcon
                            color={
                              favorites.some((fav) => fav.title === item.title)
                                ? "error"
                                : "default"
                            }
                          />
                        </IconButton>
                      </ListItem>

                      <Divider sx={{ my: 2 }} />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    color: "#666",
                    mt: 3,
                  }}
                >
                  {t("No news articles found.")}
                </Typography>
              )}
            </Paper>
          </Grid>
          {/* Right panel for favorites */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f0f9ff",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#1976d2",
                  textAlign: "center",
                  borderBottom: "2px solid #e0e0e0",
                  mb: 3,
                }}
              >
                {t("Favorite Articles")}
              </Typography>
              {favorites.length > 0 ? (
                <List
                  sx={{ width: "100%", maxHeight: "75vh", overflow: "auto" }}
                >
                  {favorites.map((fav, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          p: 2,
                          borderRadius: "8px",
                          backgroundColor: "white",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ width: "100%" }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "600", color: "#424242" }}
                          >
                            {fav.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            sx={{ color: "#757575" }}
                          >
                            {t("publishedOn", {
                              date: fav.publishedAt
                                ? moment(fav.publishedAt).format("LL")
                                : "",
                            })}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#616161" }}>
                            {fav.description}
                          </Typography>
                          <Link
                            href={fav.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              mt: 1,
                              color: "#1976d2",
                              textDecoration: "underline",
                              "&:hover": { color: "#004ba0" },
                            }}
                          >
                            {t("Read More")}
                          </Link>
                        </Box>
                      </ListItem>
                      <Divider sx={{ my: 2 }} />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", color: "#757575", mt: 2 }}
                >
                  {t("No favorite articles saved yet.")}
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Newsletter Signup Section */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f0f9ff",
                mt: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  color: "#1976d2",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                {t("Subscribe to our Newsletter")}
              </Typography>
              <Box
                component="form"
                onSubmit={handleNewsletterSignup}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label={t("Enter your email")}
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ maxWidth: "300px", mr: 2 }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  {t("Subscribe")}
                </button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </LocalizationProvider>
  );
};

export default NewsAndUpdatesPage;
