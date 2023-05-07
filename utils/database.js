import { auth, database } from "../firebase/config.js"
import { collection, doc, setDoc, getDoc, getDocs, addDoc } from "firebase/firestore";

async function getAllComputerParts() {
    let partsCollection = collection(database, "computer_parts/");
    let parts = await getDocs(partsCollection);
    let ret = [];
    parts.forEach((doc) => {
        ret.push(doc.data());
    });
    return ret;
}

async function addUserToPending(email) {
    await addDoc(collection(database, 'pendingApproval'), {"email": email});
}

export {
    getAllComputerParts,
    addUserToPending
};