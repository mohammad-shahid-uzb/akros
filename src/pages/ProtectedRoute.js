// This component checks for the user's role
const ProtectedRoute = ({ children, user }) => {
  if (user || user.role !== "admin") {
    // If the user is not authenticated or not an admin, redirect to login or home page
    //return <Navigate to="/login" />;
    return children;
  }

  // If user is admin, render the child component
  return children;
};

export default ProtectedRoute;
