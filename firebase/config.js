// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyBLn47es6rRDLyNIftUhNrUSf1W-wPb8is",

  authDomain: "cs322-lttstore.firebaseapp.com",

  projectId: "cs322-lttstore",

  storageBucket: "cs322-lttstore.appspot.com",

  messagingSenderId: "750375157971",

  appId: "1:750375157971:web:cd53f90d40ff29a50fd426"

};

  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const auth = getAuth(app);

export {
    app, auth, database
} 
