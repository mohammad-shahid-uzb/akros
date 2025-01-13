// import { jwtDecode } from "jwt-decode";

// export const getCompanyNameFromToken = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     try {
//       // Decode the JWT token and extract the company name
//       const decodedToken = jwtDecode(token);
//       return decodedToken.companyName || ""; // Adjust the property name based on your token structure
//     } catch (error) {
//       console.error("Invalid token:", error);
//       return "";
//     }
//   }
//   return "";
// };

// utils/auth.js
export const getCompanyNameFromToken = () => {
  // Return the hardcoded company name
  return "Akros"; // Replace this with your desired company name
};
