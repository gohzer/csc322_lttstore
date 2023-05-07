import { useState } from "react";
import Navbar from "./navbars";
import { app, auth } from "@/firebase/config";
import { profile } from "console";

export default function Profile() {
    const [profileDetails, setProfileDetails] = useState<ProfileDetails>(
        new ProfileDetails("", "", false, 0)
        );
    auth.onAuthStateChanged(() => {
        if(auth.currentUser) {
            var email = auth.currentUser.email || "NOT_LOGGED_IN";
            var verfied = false; //placeholder
            var account_type = "user"; //placeholder
            var balance = 0; // placeholder
            var details = new ProfileDetails(email, account_type, verfied, balance);
            setProfileDetails(details);
        }
            
    });
    return (
        <div>
            <Navbar />
            <ProfileItem email={profileDetails.email} 
                account_type={profileDetails.account_type} 
                approval={profileDetails.approval} 
                balance={profileDetails.balance} />
        </div>
    )
}

export function ProfileItem(details: ProfileDetails) {
    return (<div>
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