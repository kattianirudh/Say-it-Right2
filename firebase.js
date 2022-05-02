// Import the functions you need from the SDKs you need

//import firebase
// import * as firebase from 'firebase';
import * as firebase from "firebase";
// import { initializeApp } from 'firebase/app';
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
let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
