import { async } from "@firebase/util";
import { auth, database } from "../firebase/config.js"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { addUserToPending } from "../utils/database"

// If email & password is acceptable creates a new user
// Inputs: String Email & Password | Outputs: Boolean Success
async function signUp(email, password) {
    addUserToPending(email);
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // add the user to the pending approval database
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      return false;
    });
    return true;
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