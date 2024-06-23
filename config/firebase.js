// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "apps-6f049.firebaseapp.com",
  projectId: "apps-6f049",
  storageBucket: "apps-6f049.appspot.com",
  messagingSenderId: "21066302314",
  appId: "1:21066302314:web:54512dce814b8e16be9b13",
  measurementId: "G-0Y9S5BG7RE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
