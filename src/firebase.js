// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Firebase configuration from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC-22lWkPpw4EfUk6-OICaEinmSrynidgc",
  authDomain: "akros-7e9df.firebaseapp.com",
  projectId: "akros-7e9df",
  storageBucket: "akros-7e9df.appspot.com",
  messagingSenderId: "446451758637",
  appId: "1:446451758637:web:34297f45aca7c615cf6aa4",
};

// Initialize Firestore

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider, signInWithPopup, signOut };
