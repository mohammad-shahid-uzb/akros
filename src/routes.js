import React from "react";
import { Route, Routes } from "react-router-dom";
import TenderDetailPage from "./pages/TenderDetails";
import HomePage from "./pages/Home";
import EmployersSection from "./pages/EmployersSection";
import JobSeekersSection from "./pages/JobSeekersSection";
import JobPostingForm from "./pages/JobPostingForm";
import ViewApplicants from "./pages/ViewApplicants";
import JobApplicationForm from "./pages/JobApplicationForm";
import NewsInputPage from "./pages/NewsInputPage";
import VendorInputPage from "./pages/VendorInputPage";
import VendorDetails from "./pages/VendorDetails";
import MarketPriceDetails from "./pages/MarketPriceDetails";
import MarketPriceForm from "./pages/MarketPriceForm";
import Tenders from "./pages/Projects_Tenders";
import MarketPriceInsights from "./pages/MarketPriceInsights";
import Labor from "./pages/LaborFeature";
import News from "./pages/NewsAndUpdatesPage";
import Vendors from "./pages/VendorListings";
import Projects from "./pages/ProjectManagement";
import UpdatePassword from "./components/Profile/UpdatePassword";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import GoogleLogin from "./components/Auth/GoogleLogin"; // Import Google login component
import VerificationPage from "./components/Auth/TelegramVerification"; // Import Telegram login component
import Logout from "./components/Auth/Logout"; // Import Logout component
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* General Routes */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute>
            <Signup />
          </ProtectedRoute>
        }
      />
      <Route path="/google-login" element={<GoogleLogin />} />
      <Route path="/telegram-verify" element={<VerificationPage />} />

      <Route path="/logout" element={<Logout />} />

      {/* Projects & Tenders */}
      <Route path="/tenders" element={<Tenders />} />
      <Route path="/tender/:id" element={<TenderDetailPage />} />
      <Route path="/materials" element={<MarketPriceInsights />} />
      <Route path="/marketpricedetails/:id" element={<MarketPriceDetails />} />
      <Route path="/market-price/add" element={<MarketPriceForm />} />
      <Route path="/workforce" element={<Labor />} />
      <Route path="/projectmanagement" element={<Projects />} />

      {/* Labor Feature */}
      <Route path="/labor/employers" element={<EmployersSection />} />
      <Route path="/labor/job-seekers" element={<JobSeekersSection />} />
      <Route path="/labor/employers/post-job" element={<JobPostingForm />} />
      <Route
        path="/labor/employers/view-applicants"
        element={<ViewApplicants />}
      />
      <Route
        path="/job/:companyName/:jobTitle/apply"
        element={<JobApplicationForm />}
      />

      {/* Vendors */}
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/add-vendor" element={<VendorInputPage />} />
      <Route path="/vendor/:id" element={<VendorDetails />} />

      {/* News and Updates */}
      <Route path="/news" element={<News />} />
      <Route path="/input" element={<NewsInputPage />} />

      {/* Profile Management */}
      <Route path="/update-password" element={<UpdatePassword />} />
    </Routes>
  );
};

export default AppRoutes;
