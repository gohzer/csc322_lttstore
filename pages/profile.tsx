import { useEffect, useState } from "react";
import Navbar from "./navbars";
import Footer from "./footer";
import { app, auth } from "@/firebase/config";
import { useRouter } from "next/router";
import styles from '@/styles/profile.module.css';

export default function Profile() {
    const router = useRouter();
    const [balance, setBalance] = useState(0);
    const [profileDetails, setProfileDetails] = useState<ProfileDetails>(
        new ProfileDetails("", "", false, 0)
        );

    useEffect(() => {
        auth.onAuthStateChanged(async () => {
            if(auth.currentUser) {
                var email = auth.currentUser.email || "NOT_LOGGED_IN";
                var verfied = false; //placeholder
                var account_type = "user"; //placeholder

                var bal_local = localStorage.getItem('balance' + auth.currentUser.email);
                if(bal_local === null) localStorage.setItem('balance' + auth.currentUser.email, '0');
                var balance = parseFloat(localStorage.getItem('balance' + auth.currentUser.email) || '0');

                setBalance(balance);
                var details = new ProfileDetails(email, account_type, verfied, balance);
                setProfileDetails(details);
            }
                
        });
    }, [])
    

    function signOut() {
        auth.signOut()
        .then(() => {
            router.push("/");
        })
        .catch(e => console.error(e));
    }

    const addbal = () => {
        if(auth.currentUser) {
            setBalance(balance + 100);
            localStorage.setItem('balance' + auth.currentUser.email, `${balance + 100}`);
        }
        
    }


    return (
        <div>
            <Navbar />
            <div className={styles.container}>

            <h1 className={styles.heading}>User Profile</h1>
                <div className={styles.card}>

                <ProfileItem email={profileDetails.email} 
                    account_type={profileDetails.account_type} 
                    approval={profileDetails.approval} 
                    balance={balance} />
                
                <button className={styles.button} onClick={signOut}>Sign Out</button>
                <button className={styles.button} onClick={addbal}>Add Balance</button>
                </div>
                
            </div>
            <Footer/>
        </div>
    )
}

export function ProfileItem(details: ProfileDetails) {
    return (<div className={styles.profileitem}>
        <p>{details.email}</p>
        <p>Account Type: {details.account_type}</p>
        <p>Approval Status: {details.approval}</p>
        <p>Balance: {details.balance}</p>
    </div>)
}

class ProfileDetails {
    public email: string;
    public account_type: string;
    public approval: boolean;
    public balance: number;

    public constructor(email: string, account_type: string, approval: boolean, balance: number) {
        this.email = email;
        this.account_type = account_type;
        this.approval = approval;
        this.balance = balance;
    }

}