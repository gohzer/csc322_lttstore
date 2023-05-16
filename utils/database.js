import { auth, database } from "../firebase/config.js"
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, addDoc } from "firebase/firestore";

export async function queryCollection(path) {
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
        emailSet.add(item.email);
    });
    return emailSet;
}

export async function getNonApprovedUsers() {
    let ret = await queryCollection("pendingApproval/")
    return ret;
}

export async function getNonApprovedUserSet() {
    let ret = await queryCollection("pendingApproval/")
    let emailSet = new Set();
    ret.forEach(item => {
        emailSet.add(item.email);
    });
    return emailSet;
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

export function getIdFromDoc(docum) {
    return u._document.key.path.segments[6];
}

export async function addComputer(cpuId, moboId, ramId, gpuId, caseId, psuId, ssdId) {
    await addDoc(collection(database, 'computers'), {
        "cpu": cpuId,
        "mobo": moboId,
        "ram": ramId,
        "gpu": gpuId,
        "case": caseId,
        "psu": psuId,
        "ssd": ssdId
    });
}

export async function getAllComputers() {
    return await queryCollection("computers/")
}

export async function getPartById(id) {
    let partsCollection = collection(database, "computer_parts/");
    let part = await getDoc(doc(partsCollection, id));
    return part.data();
}

export async function addToPurchased(uid, name, type, cost) {
    let collec = collection(database, 'transactions', uid, 'purchases');
    let document = {
        "name": name,
        "type": type,
        "cost": cost
    }
    await addDoc(collec, document)
}

export async function getPurchases(uid) {
    let collec = collection(database, 'transactions', uid, 'purchases');
    let parts = await getDocs(collec);
    let ret = [];
    parts.forEach((doc) => {
        ret.push(doc.data());
    });
    return ret;
}

export async function getEmployees() {
    return await queryCollection("employees/");
}

export async function addEmployeeComplaint(email, from_email, memo) {
    await getEmployeeSet().then(async s => {
        let collec = collection(database, 'employees', email, 'complaints');
        await addDoc(collec, {'email': from_email, 'memo': memo})
    })
}

export async function addEmployeeCompliment(email, from_email, memo) {
    await getEmployeeSet().then(async s => {
        let collec = collection(database, 'employees', email, 'compliments');
        await addDoc(collec, {'email': from_email, 'memo': memo})
    })
}

export async function getEmployeeComplaints(email) {
    let collec = collection(database, 'employees', email, 'complaints');
    let parts = await getDocs(collec);
    let ret = [];
    parts.forEach((doc) => {
        ret.push(doc.data());
    });
    return ret;
}

export async function getEmployeeCompliments(email) {
    let collec = collection(database, 'employees', email, 'compliments');
    let parts = await getDocs(collec);
    let ret = [];
    parts.forEach((doc) => {
        ret.push(doc.data());
    });
    return ret;
}


export async function addToDatabase(collect, doc) {
    let collec = collection(database, collect);
    await addDoc(collec, doc)
}

export async function addUserComplaint(email, from_email, memo) {
    await getEmployeeSet().then(async s => {
        let collec = collection(database, 'users', email, 'complaints');
        await addDoc(collec, {'email': from_email, 'memo': memo})
    })
}

export async function addUserCompliment(email, from_email, memo) {
    await getEmployeeSet().then(async s => {
        let collec = collection(database, 'users', email, 'compliments');
        await addDoc(collec, {'email': from_email, 'memo': memo})
    })
}

export async function getUserComplaints(email) {
    let collec = collection(database, 'users', email, 'complaints');
    let parts = await getDocs(collec);
    let ret = [];
    parts.forEach((doc) => {
        ret.push(doc.data());
    });
    return ret;
}

export async function getUserCompliments(email) {
    let collec = collection(database, 'users', email, 'compliments');
    let parts = await getDocs(collec);
    let ret = [];
    parts.forEach((doc) => {
        ret.push(doc.data());
    });
    return ret;
}