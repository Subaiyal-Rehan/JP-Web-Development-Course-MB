import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBGUcA4gi5S1uBl_-8ESohDWK0eAPtkqPc",

  authDomain: "assignment-17-jp.firebaseapp.com",

  databaseURL: "https://assignment-17-jp-default-rtdb.firebaseio.com",

  projectId: "assignment-17-jp",

  storageBucket: "assignment-17-jp.appspot.com",

  messagingSenderId: "551418650226",

  appId: "1:551418650226:web:2929bd34a5c7eaefc32ceb",

  measurementId: "G-QGWTMR3KCN"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export default app;