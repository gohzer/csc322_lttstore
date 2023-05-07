import { async } from "@firebase/util";
import { auth, database } from "../firebase/config.js"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence  } from "firebase/auth";

// If email & password is acceptable creates a new user
// Inputs: String Email & Password | Outputs: Boolean Success
const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // add the user to the database
      
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

// Authenticates email & password and signIns in user
// Inputs: String Email & Password | Outputs: String UID
const signIn = async (email, password) => {
  console.log('Attempting user authentication');
  
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export { signUp, signIn };