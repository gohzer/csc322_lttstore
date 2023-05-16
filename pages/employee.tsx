// TODO: show this page only if authenticated as employee
// Show all the pendingApproval users, which should be added to as soon as the user signs up
// all purchases should check for approval
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Navbar from "./navbars";
import Footer from "./footer";
import styles from '@/styles/Employee.module.css';
import { approveUserFirebase, getNonApprovedUsers, queryCollection, addToDatabase, addUserComplaint, addEmployeeCompliment, getUserCompliments, getUserComplaints } from "@/utils/database";
import Link from 'next/link';


/* */


export default function EmployeeHub() {
    const router = useRouter();

    const [reload, setReload] = useState<boolean>(false);
    const [userList, setUserList] = useState([{email: "none"}]);

    function UserApproval(props: {email: string}) {
        async function approveUser() {
            await approveUserFirebase(props.email);
            window.location.reload();

            //if approved add the customer to database
            addToDatabase('customers', {
                'email': props.email,
                'complaint': 0,
                'compliment': 0
              })
  
        }

        async function rejectUser(email: string) {
            // Implement the logic for rejecting the user
            //window.location.reload();
            router.push({
                pathname: '/memoPage',
                query: {email: email}
            });
          }


          function handleIssueCompliment(email: string) {
            console.log(`Issue compliment for user: ${email}`);
            // Implement your functionality here
            router.push(`/issueComplimentPage?email=${email}`);

          }
        
          function handleIssueComplaint(email: string) {

            //addUserComplaint('asd@gmail.com', 'nabilomi1@gmail.com', 'he killed my family')
           // let test = getUserComplaints('asd@gmail.com');
            //console.log(test);

            console.log(`Issue complaint for user: ${email}`);
            // Implement your functionality here

            router.push(`/issueComplaintPage?email=${email}`);
          }
          return (
            <>
              <tr>
                <td>{props.email}</td>
                <td>
                  <button className={styles.button} onClick={approveUser}>
                    Approve
                  </button>
                  <button className={styles.button} onClick={() => rejectUser(props.email)}>
                    Reject
                  </button>
                  <button className={styles.button} onClick={() => handleIssueCompliment(props.email)}>
                    Issue Compliment
                  </button>
                  <button className={styles.button} onClick={() => handleIssueComplaint(props.email)}>
                    Issue Complaint
                  </button>
                </td>
              </tr>
            </>
          );
        }
    async function getUsers() {
        let users = await getNonApprovedUsers();
        setUserList(users);
        setReload(true);
    }

    
    useEffect(() => {
        getUsers(); 
    }, [reload])

    
    return(
        <>
        <Navbar />    
        
        <h2 className={styles.title}>Employee Hub</h2>
        
        <h2 className={styles.h2} >Users to Approve</h2>
        <div className={styles.grid}>
        
            <div className={styles.container}>
            
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

            <div className={styles.contact}>
                <h1 className={styles.header}>Contact Customers</h1>
                    <button className={styles.supportbtn}>
                    <a href='https://www.gmail.com'>Email</a>
                </button>
            </div>
            
        </div>

       
        <Footer />
        </>
        
    )
}

