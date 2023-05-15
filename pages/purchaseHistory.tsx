import { useEffect, useState } from "react"
import Navbar from "./navbars";
import { auth } from "../firebase/config"
import { getPurchases } from "@/utils/database";
import { useRouter } from "next/router";
import styles from "@/styles/history.module.css"

export default function PurchaseHistory() {
    const [purchases, setPurchases] = useState<PlistItem[]>([]);
    const router = useRouter();

    async function populatePurchases(uid: string) {
        await getPurchases(uid).then(plist => setPurchases(plist));
    }

    useEffect(() => {
        if(auth.currentUser) {
            populatePurchases(auth.currentUser.uid);
            console.log(purchases)
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className={styles.grid}>
            <div className={styles.container}>
                <h1 className={styles.header}>Purchase History</h1>
                <div className={styles.listContainer}>
                    <p className={styles.listItemHead}>Item Type</p>
                    <p className={styles.listItemHead}>Item Name</p>
                    <p className={styles.listItemHead}>Item Cost</p>
                </div>
                {purchases && purchases.map(p => 
                    <div className={styles.listContainer}>
                        <p className={styles.listItem}>{p.type}</p>
                        <p className={styles.listItem}>{p.name}</p>
                        <p className={styles.listItem}>{p.cost}</p>
                    </div>)}
            </div>
            <div className={styles.contact}>
                <h1 className={styles.header}>We are here to Help 24/7</h1>
                <p className={styles.supportp}>Contact Support Team For All your Inquires</p>
                    <button className={styles.supportbtn}>
                    <a href='/contact'>Support</a>
                </button>
            </div>
            </div>
           
        </div>
    )
}

type PlistItem  = {
    cost: String,
    name: String,
    type: String
}