import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { createVendor } from "../services/vendorService"; // Adjust the path based on your file structure

const initialVendorState = {
  name: "Global Concrete Solutions",
  category: "Concrete Suppliers",
  location: "Tashkent, Uzbekistan",
  rating: 4.5,
  description:
    "Global Concrete Solutions is a leading supplier of high-quality concrete and construction materials. With over 20 years of experience, we are committed to delivering excellence and reliability.",
  contacts: {
    email: "info@globalconcrete.com",
    phone: "+998 71 123 4567",
    telegram: "@globalconcrete",
    locations: [
      "Tashkent, Uzbekistan",
      "Samarkand, Uzbekistan",
      "Bukhara, Uzbekistan",
    ],
    keyContacts: [
      {
        name: "John Doe",
        position: "Sales Manager",
        phone: "+998 90 123 4567",
        email: "johndoe@globalconcrete.com",
      },
      {
        name: "Jane Smith",
        position: "Technical Consultant",
        phone: "+998 91 123 4568",
        email: "janesmith@globalconcrete.com",
      },
    ],
  },
  ourStory: {
    title: "Our Story",
    content:
      "Global Concrete Solutions began its journey in 2000 with a vision to supply the best concrete materials to the Central Asian region. Over the past two decades, we have established ourselves as the go-to supplier for all concrete needs, thanks to our focus on quality, innovation, and customer satisfaction.",
  },
  whatWeDo: {
    title: "What We Do",
    content:
      "We provide a wide range of concrete products, including ready-mix concrete, pre-cast concrete, and specialty concrete mixes. Our team of experts ensures that each batch meets the highest industry standards, whether for small residential projects or large-scale commercial constructions.",
  },
  commercialExperience: {
    title: "Commercial Experience",
    content:
      "We have successfully completed over 500 commercial projects across Uzbekistan, ranging from large infrastructure projects to high-rise buildings. Our expertise in project management and concrete technology has made us a trusted partner for leading construction companies.",
  },
  regionsServiced: {
    title: "Regions & Serviced",
    content:
      "We service the entire Uzbekistan region, with a focus on Tashkent, Samarkand, Bukhara, and Khiva. Our logistics team ensures timely deliveries to even the most remote locations, maintaining quality throughout the supply chain.",
  },
  qualificationsData: {
    title: "Qualifications",
    content:
      "ISO 9001:2015 certified for Quality Management Systems. Member of the International Concrete Association. Certified Supplier for Government Projects in Uzbekistan.",
  },
  image: null, // Placeholder for an image file, can be added later.
};

const VendorInputPage = () => {
  const [vendor, setVendor] = useState(initialVendorState);
  const [selectedImage, setSelectedImage] = useState(null);

  // Handlers for state updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setVendor((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleContactsChange = (index, field, value) => {
    const updatedContacts = [...vendor.contacts.keyContacts];
    updatedContacts[index][field] = value;
    setVendor((prev) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        keyContacts: updatedContacts,
      },
    }));
  };

  const addKeyContact = () => {
    setVendor((prev) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        keyContacts: [
          ...prev.contacts.keyContacts,
          { name: "", position: "", phone: "", email: "" },
        ],
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setVendor((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(vendor).forEach((key) => {
      if (
        key === "contacts" ||
        key === "ourStory" ||
        key === "whatWeDo" ||
        key === "commercialExperience" ||
        key === "regionsServiced" ||
        key === "qualificationsData"
      ) {
        formData.append(key, JSON.stringify(vendor[key]));
      } else if (key === "image" && vendor.image) {
        formData.append("image", vendor.image);
      } else {
        formData.append(key, vendor[key]);
      }
    });

    // Debugging: Log each entry in the FormData to check the content
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await createVendor(formData);
      console.log("Vendor data submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting vendor data:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "900px",
        margin: "auto",
        bgcolor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 3, color: "#3f51b5" }}
      >
        Vendor Input Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* General Information Section */}
        <Card variant="outlined" sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium" }}>
              General Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Vendor Name"
                  name="name"
                  value={vendor.name}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={vendor.category}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={vendor.location}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Rating"
                  type="number"
                  name="rating"
                  value={vendor.rating}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={vendor.description}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Contact Information Section */}
        <Card variant="outlined" sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium" }}>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={vendor.contacts.email}
                  onChange={(e) =>
                    handleNestedChange("contacts", "email", e.target.value)
                  }
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={vendor.contacts.phone}
                  onChange={(e) =>
                    handleNestedChange("contacts", "phone", e.target.value)
                  }
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telegram"
                  name="telegram"
                  value={vendor.contacts.telegram}
                  onChange={(e) =>
                    handleNestedChange("contacts", "telegram", e.target.value)
                  }
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Key Contacts Section */}
        <Card variant="outlined" sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium" }}>
              Key Contacts
            </Typography>
            {vendor.contacts.keyContacts.map((contact, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  mb: 2,
                  boxShadow: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#fafafa",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={contact.name}
                      onChange={(e) =>
                        handleContactsChange(index, "name", e.target.value)
                      }
                      variant="outlined"
                      sx={{ bgcolor: "white", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={contact.position}
                      onChange={(e) =>
                        handleContactsChange(index, "position", e.target.value)
                      }
                      variant="outlined"
                      sx={{ bgcolor: "white", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={contact.phone}
                      onChange={(e) =>
                        handleContactsChange(index, "phone", e.target.value)
                      }
                      variant="outlined"
                      sx={{ bgcolor: "white", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={contact.email}
                      onChange={(e) =>
                        handleContactsChange(index, "email", e.target.value)
                      }
                      variant="outlined"
                      sx={{ bgcolor: "white", borderRadius: 1 }}
                    />
                  </Grid>
                </Grid>
              </Card>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={addKeyContact}
              sx={{ mt: 2, bgcolor: "#3f51b5" }}
            >
              Add Key Contact
            </Button>
          </CardContent>
        </Card>

        {/* Additional Information Sections */}
        {[
          "ourStory",
          "whatWeDo",
          "commercialExperience",
          "regionsServiced",
          "qualificationsData",
        ].map((section) => (
          <Card
            key={section}
            variant="outlined"
            sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                {vendor[section].title}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={`Enter ${vendor[section].title} content`}
                value={vendor[section].content}
                onChange={(e) =>
                  handleNestedChange(section, "content", e.target.value)
                }
                variant="outlined"
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </CardContent>
          </Card>
        ))}
        {/* Image Upload Field */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ py: 1, mt: 2, bgcolor: "#3f51b5", fontWeight: "medium" }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {selectedImage && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Vendor Preview"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "10px",
                }}
              />
            </Box>
          )}
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{
            py: 2,
            mt: 3,
            fontSize: "1.2rem",
            bgcolor: "#388e3c",
            fontWeight: "bold",
          }}
        >
          Submit Vendor Data
        </Button>
      </form>
    </Box>
  );
};

export default VendorInputPage;
