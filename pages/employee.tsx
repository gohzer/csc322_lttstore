// TODO: show this page only if authenticated as employee
// Show all the pendingApproval users, which should be added to as soon as the user signs up
// all purchases should check for approval
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Navbar from "./navbars";
import Footer from "./footer";
import styles from '@/styles/Employee.module.css';
import { approveUserFirebase, getNonApprovedUsers } from "@/utils/database";
import Link from 'next/link';


export default function EmployeeHub() {
    const router = useRouter();

    const [reload, setReload] = useState<boolean>(false);
    const [userList, setUserList] = useState([{email: "none"}]);

    function UserApproval(props: {email: string}) {
        async function approveUser() {
            await approveUserFirebase(props.email);
            window.location.reload();
        }
        return (
            <>
            <tr>
                <td>{props.email}</td>
                <td>
                <button className={styles.button} onClick={approveUser}>Approve</button>
                <button className={styles.button} onClick={rejectUser}>Reject</button>
                </td>
            </tr>
            </>
        )
    }

    async function getUsers() {
        let users = await getNonApprovedUsers();
        setUserList(users);
        setReload(true);
    }

    async function rejectUser() {
        // Implement the logic for rejecting the user
        //window.location.reload();
        router.push(`/memoPage`);

        
      }
    useEffect(() => {
        getUsers(); 
    }, [reload])

    
    return(
        <>
        <Navbar />    
        
        <h2 className={styles.title}>Employee Hub</h2>
        <div className={styles.container}>
            
            <h2>Users to Approve</h2>
            <table className={styles.table}>
            <thead>
                <tr>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((u) => (
                <UserApproval email={u.email} />
                ))}
            </tbody>
            </table>
            
        </div>
        <Footer />
        </>
        
    )
}

