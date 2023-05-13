// TODO: show this page only if authenticated as employee
// Show all the pendingApproval users, which should be added to as soon as the user signs up
// all purchases should check for approval

import { useEffect, useState } from "react";
import Navbar from "./navbars";
import { approveUserFirebase, getNonApprovedUsers } from "@/utils/database";

export default function EmployeeHub() {
    const [reload, setReload] = useState<boolean>(false);
    const [userList, setUserList] = useState([{email: "none"}]);

    function UserApproval(props: {email: string}) {
        async function approveUser() {
            await approveUserFirebase(props.email);
            window.location.reload();
        }
        return (
            <div>
                <p>{props.email}</p>
                <button onClick={approveUser}>Approve</button>
            </div>
        )
    }

    async function getUsers() {
        let users = await getNonApprovedUsers();
        setUserList(users);
        setReload(true);
    }
    useEffect(() => {
        getUsers();
    }, [reload])
    return(<div>
        <Navbar />
        <p>Users to approve:</p>
        <div>
            {userList.map(u => <UserApproval email={u.email} />)}
        </div>
    </div>)
}

