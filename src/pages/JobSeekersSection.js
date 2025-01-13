import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import { FaBuilding, FaSuitcase, FaFileAlt } from "react-icons/fa";
import { getJobPostings } from "../services/jobPostingService"; // Import the service to get job postings

const JobSeekersSection = () => {
  const lastUpdateDate = new Date().toLocaleString(); // Dynamic current date and time

  // State variables
  const [jobListings, setJobListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("company");
  const [loading, setLoading] = useState(true);

  console.log("jobListings", jobListings);
  // Fetch job postings from backend
  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const data = await getJobPostings();
        setJobListings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job postings:", error);
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && sortDirection === "asc";
    setSortDirection(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sort the listings based on orderBy and sortDirection
  const sortedListings = [...jobListings].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return sortDirection === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Filter the listings based on the search query
  const filteredListings = sortedListings.filter((job) => {
    // Console log each job for debugging
    console.log("Job object:", job);

    return Object.values(job || {}).some((value) =>
      value?.toString()?.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 4,
        }}
      >
        {/* Companies Card */}
        <Box
          sx={{
            textAlign: "center",
            padding: 3,
            borderRadius: 2,
            background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <FaBuilding size={40} color="#007bff" />
          <Typography variant="h5" color="primary" sx={{ marginTop: 1 }}>
            Companies
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {jobListings.length} {/* Number of companies/jobs listed */}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Last updated: {lastUpdateDate}
          </Typography>
        </Box>
        {/* Vacancies Card */}
        <Box
          sx={{
            textAlign: "center",
            padding: 3,
            borderRadius: 2,
            background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <FaSuitcase size={40} color="#28a745" />
          <Typography variant="h5" color="success" sx={{ marginTop: 1 }}>
            Vacancies
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {jobListings.length}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Last updated: {lastUpdateDate}
          </Typography>
        </Box>
        {/* Resumes Card */}
        <Box
          sx={{
            textAlign: "center",
            padding: 3,
            borderRadius: 2,
            background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <FaFileAlt size={40} color="#dc3545" />
          <Typography variant="h5" color="error" sx={{ marginTop: 1 }}>
            Resumes
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {jobListings.length}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Last updated: {lastUpdateDate}
          </Typography>
        </Box>
      </Box>

      {/* Search Filter Section */}
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          padding: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Find Your Next Job
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "100%" }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Job Vacancies Table */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Available Job Vacancies
        </Typography>
        <Paper sx={{ overflow: "hidden" }}>
          {loading ? (
            <Typography variant="h6" sx={{ textAlign: "center", padding: 4 }}>
              Loading job postings...
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "company"}
                      direction={orderBy === "company" ? sortDirection : "asc"}
                      onClick={() => handleRequestSort("company")}
                    >
                      Company
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "fieldOfActivity"}
                      direction={
                        orderBy === "fieldOfActivity" ? sortDirection : "asc"
                      }
                      onClick={() => handleRequestSort("fieldOfActivity")}
                    >
                      Field of Activity
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "region"}
                      direction={orderBy === "region" ? sortDirection : "asc"}
                      onClick={() => handleRequestSort("region")}
                    >
                      Region
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "numberOfVacancies"}
                      direction={
                        orderBy === "numberOfVacancies" ? sortDirection : "asc"
                      }
                      onClick={() => handleRequestSort("numberOfVacancies")}
                    >
                      Number of Vacancies
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredListings.map((job, index) => (
                  <TableRow key={index}>
                    <TableCell>{job?.companyName ?? "N/A"}</TableCell>
                    <TableCell>{job?.fieldOfActivity ?? "N/A"}</TableCell>
                    <TableCell>{job?.region ?? "N/A"}</TableCell>
                    <TableCell>{job?.numberOfVacancies ?? 0}</TableCell>
                    <TableCell>
                      <Link
                        to={`/job/${job?.companyName?.replace(
                          /\s+/g,
                          "-"
                        )}/${job?.fieldOfActivity?.replace(/\s+/g, "-")}/apply`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained" color="primary">
                          Apply
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>

      {/* Job Seeker Information Section */}
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#fafafa",
          textAlign: "center",
          borderRadius: 1,
          marginBottom: 4,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Tips for Job Seekers
        </Typography>
        <Typography variant="body1">
          Stay updated with the latest job opportunities. Use our platform to
          enhance your career prospects by accessing a wide range of job
          postings across various industries.
        </Typography>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default JobSeekersSection;
