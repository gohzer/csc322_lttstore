import { auth, database } from "../firebase/config.js"
import { collection, doc, setDoc, getDoc, getDocs, addDoc } from "firebase/firestore";

async function queryCollection(path) {
    let partsCollection = collection(database, path);
    let parts = await getDocs(partsCollection);
    let ret = [];
    parts.forEach((doc) => {
        ret.push(doc.data());
    });
    return ret;
}

export async function getAllComputerParts() {
    return queryCollection("computer_parts/")
}

export async function addUserToPending(email) {
    await addDoc(collection(database, 'pendingApproval'), {"email": email});
}


export async function getEmployeeSet() {
    let ret = await queryCollection("employees/");
    let emailSet = new Set();
    ret.forEach(item => {
        emailSet.add(item.employee_email);
    });
    return emailSet;
}