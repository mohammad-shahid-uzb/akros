// firestoreService.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import the Firestore instance

// Function to add or update user data in Firestore
const addUserToFirestore = async (userId, userData) => {
  try {
    // Reference to the user document in the "users" collection
    const userRef = doc(db, "users", userId);

    // Write data to the document
    await setDoc(userRef, userData, { merge: true }); // merge: true updates existing fields

    console.log("User data written to Firestore successfully!");
  } catch (error) {
    console.error("Error writing user data to Firestore:", error);
  }
};

export { addUserToFirestore };
