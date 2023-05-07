import { auth, database } from "../firebase/config.js"
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

async function getAllComputerParts() {
    let partsColection = collection(database, "computer_parts/");
    let parts = await getDocs(partsColection);
    let ret = [];
    parts.forEach((doc) => {
        ret.push(doc.data());
    });
    return ret;
}

export {
    getAllComputerParts
};