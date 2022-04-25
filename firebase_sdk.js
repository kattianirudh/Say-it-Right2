// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDETekR89Af5sk4rHQgJJjICg30zuXIy9s",
  authDomain: "sayitright2-b4316.firebaseapp.com",
  projectId: "sayitright2-b4316",
  storageBucket: "sayitright2-b4316.appspot.com",
  messagingSenderId: "832795254184",
  appId: "1:832795254184:web:0fabb1cacb9776abec119d",
  measurementId: "G-XX2VLYDMP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);