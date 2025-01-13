import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password Update Submitted:", { currentPassword, newPassword });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Current Password"
          type="password"
          variant="outlined"
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          sx={{ marginTop: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Update Password
        </Button>
      </form>
    </Container>
  );
};

export default UpdatePassword;
