// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1UPX-d69qMusmr0WrdtXj3JmwRHDSqLo",
  authDomain: "quiztick1.firebaseapp.com",
  projectId: "quiztick1",
  storageBucket: "quiztick1.appspot.com",
  messagingSenderId: "303375698755",
  appId: "1:303375698755:web:f7cc445ab5448a51087df6",
  measurementId: "G-X744MWB47M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;