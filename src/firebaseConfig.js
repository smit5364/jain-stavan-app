// firebaseConfig.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  // Add your Firebase configuration here
  apiKey: "AIzaSyAbYromvE1yC-8NSJslfh76nG08qKbMXdk",
  authDomain: "jain-stavan-86cb6.firebaseapp.com",
  databaseURL: "https://jain-stavan-86cb6-default-rtdb.firebaseio.com",
  projectId: "jain-stavan-86cb6",
  storageBucket: "jain-stavan-86cb6.appspot.com",
  messagingSenderId: "285813640279",
  appId: "1:285813640279:web:ab619d720373a0369b6712",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
