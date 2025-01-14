// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLE8QdXQLDpBljgU4-vXQ_8CY0oEvQ3rI",
  authDomain: "netflixgpt-c9e80.firebaseapp.com",
  projectId: "netflixgpt-c9e80",
  storageBucket: "netflixgpt-c9e80.firebasestorage.app",
  messagingSenderId: "250825077796",
  appId: "1:250825077796:web:dfd658e6e854cb600294b1",
  measurementId: "G-9LXXJQ0MPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);