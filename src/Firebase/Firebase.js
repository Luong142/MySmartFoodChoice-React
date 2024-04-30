// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-ivqhXPZw7ZpT9Ojl08E9TW2bQVAr_rQ",
  authDomain: "myfoodchoice-dc7bd.firebaseapp.com",
  databaseURL: "https://myfoodchoice-dc7bd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "myfoodchoice-dc7bd",
  storageBucket: "myfoodchoice-dc7bd.appspot.com",
  messagingSenderId: "316923369990",
  appId: "1:316923369990:web:93a713295c21bc39da4187",
  measurementId: "G-0ZD96GDHTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Exporting both Firestore and Realtime Database instances
export { db, database, auth };  // Include 'database' in your exports
