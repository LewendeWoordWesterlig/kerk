// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyArlmcvO6K6m2xxjO5fLRYT-7RVdAS5SKU",
  authDomain: "lwwb-533a7.firebaseapp.com",
  databaseURL: "https://lwwb-533a7-default-rtdb.firebaseio.com",
  projectId: "lwwb-533a7",
  storageBucket: "lwwb-533a7.firebasestorage.app",
  messagingSenderId: "62214698093",
  appId: "1:62214698093:web:8f781b3a6481974bf43b64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// **Create and export the database instance**
export const db = getDatabase(app);
