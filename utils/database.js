import { auth, database } from "../firebase/config.js"
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, addDoc } from "firebase/firestore";

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
    return await queryCollection("computer_parts/")
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

export async function getNonApprovedUsers() {
    let ret = await queryCollection("pendingApproval/")
    return ret;
}

export async function approveUserFirebase(email) {
    let collec = collection(database, "pendingApproval")
    let users = await getDocs(collec);
    let docList = [];
    users.forEach(u => {
        if(u.data().email == email) {
            let id = u._document.key.path.segments[6];
            docList.push(id);
        }
    });
    let id = docList[0];
    await deleteDoc(doc(database, "pendingApproval", id));
    console.log("removed")
}

function getIdFromDoc(docum) {
    return u._document.key.path.segments[6];
}