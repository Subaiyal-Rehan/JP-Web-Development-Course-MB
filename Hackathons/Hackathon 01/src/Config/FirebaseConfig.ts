import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBfGXv3D9a1TUKtl48oHjgeeua6R_vDdEg",

  authDomain: "hackathon-2-jp.firebaseapp.com",

  databaseURL: "https://hackathon-2-jp-default-rtdb.firebaseio.com",

  projectId: "hackathon-2-jp",

  storageBucket: "hackathon-2-jp.appspot.com",

  messagingSenderId: "504450074778",

  appId: "1:504450074778:web:a63717b4936b3f172a7723",

  measurementId: "G-46BL2BJJW6"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export default app;