import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { getApplicationsForCompany } from "../services/jobApplicationService"; // Import the function
import { getCompanyNameFromToken } from "../utils/auth"; // Import the utility function to get company name from token

const ViewApplicants = () => {
  const [companyName, setCompanyName] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch the company name from the token and set it in state
  const fetchCompanyName = () => {
    const company = getCompanyNameFromToken(); // Get the company name from the token
    setCompanyName(company); // Set the company name in the state
  };

  // Wrap the fetchApplicants function in useCallback to ensure it does not change on every render
  const fetchApplicants = useCallback(async () => {
    try {
      const data = await getApplicationsForCompany(companyName); // Fetch applications for the given company

      setApplicants(data); // Update state with the fetched data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching job applications:", error);
      setLoading(false); // Set loading to false in case of error
    }
  }, [companyName]); // Dependency array includes companyName, so it only changes when companyName changes

  useEffect(() => {
    fetchCompanyName(); // Fetch company name when the component mounts
  }, []);

  useEffect(() => {
    if (companyName) {
      fetchApplicants(); // Fetch applicants when the company name is set
    }
  }, [companyName, fetchApplicants]); // Include fetchApplicants in the dependency array

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "auto",
        padding: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <IconButton
          onClick={() => window.history.back()}
          sx={{ marginRight: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Applicants for Company: {companyName || "Loading..."}
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Job Title</TableCell> {/* New Job Title Column */}
                <TableCell>Application Date</TableCell>
                <TableCell>Resume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <TableRow key={applicant._id}>
                    <TableCell>{applicant.applicantName}</TableCell>
                    <TableCell>{applicant.applicantEmail}</TableCell>
                    <TableCell>{applicant.applicantPhone}</TableCell>
                    <TableCell>{applicant.jobTitle}</TableCell>{" "}
                    {/* Display Job Title */}
                    <TableCell>
                      {new Date(applicant.dateApplied).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`${process.env.REACT_APP_BACKEND_URL}/${applicant.resume}`} // Update the URL to point to the resume
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {" "}
                    {/* Updated colspan to match new columns */}
                    No applicants found for the company: {companyName}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ViewApplicants;
