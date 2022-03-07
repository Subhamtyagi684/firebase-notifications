// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDQjRGoc1Eb0rZt5QLaZSaoTEtX2apL7k",
  authDomain: "fir-project-affb7.firebaseapp.com",
  projectId: "fir-project-affb7",
  storageBucket: "fir-project-affb7.appspot.com",
  messagingSenderId: "753676898557",
  appId: "1:753676898557:web:9bda4e81a74703c4c66e94",
  measurementId: "G-VB6Z9QN1G1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);