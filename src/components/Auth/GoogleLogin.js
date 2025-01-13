// GoogleLogin.js
import React from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUserToFirestore } from "../../firestoreService";
import { useNavigate } from "react-router-dom";

const GoogleSignUpButton = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user is new, then add to Firestore
      const userData = {
        email: user.email,
        name: user.displayName,
        isAdmin: false,
        createdAt: new Date(),
      };

      await addUserToFirestore(user.uid, userData);

      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
};

export default GoogleSignUpButton;
