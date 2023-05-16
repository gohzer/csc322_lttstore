// pages/StoreOwnerHub.tsx


/* The store owner should be able to "VIEW" compliments and complaints for both the customer and employee

    When they click the view buttons they will be taken to a page with the description of the compliment and/or complaint
    there they will have the option to issue more compliments or compliments by counter or something

    The view memo part will appear next to the customers and will take the owner to a page showing the memo written by the 
    employee for the reason of their rejection. 


*/
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/storeOwner.module.css';
import { getEmployeeComplaints, getUserComplaints, queryCollection, addToDatabase, approveUserFirebase, getNonApprovedUsers, getEmployeeSet } from '@/utils/database';

interface User {
    email: string;
    complaints?: number;
    compliments?: number;
    approved?: boolean;
    isRejected?: boolean;
  }

interface Reject {
  email: string;
  notes: string;
}

const StoreOwnerHub = () => {
    const router = useRouter();

  const [employees, setEmployees] = useState<User[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [rejects, setRejects] = useState<Reject[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const eC = await getEmployeeComplaints('nabilomi1@gmail.com');
      const fetchedEmployees = await queryCollection('employees');
      const fetchedCustomers = await queryCollection('customers');
      const fetchedRejects = await queryCollection('rejections');
      const all = await getUserComplaints('nabilomi1@gmail.com');
      console.log(all);
      console.log("rejects", fetchedRejects);
      console.log(eC);
      console.log(fetchedEmployees);
      setEmployees(fetchedEmployees);
      setCustomers([
        ...fetchedCustomers, 
        ...fetchedRejects.map(reject => ({ ...reject, isRejected: true }))
      ]);
      setRejects(fetchedRejects);
    };

    fetchUsers();
  }, []);

  const handleCompliment = (user: User) => {
    router.push({
      pathname: '/complimentPage',
      query: { email: user.email },
    });
  };

  const handleComplaint = (user: User) => {
    router.push({
      pathname: '/complaintPage',
      query: { email: user.email },
    });
  };

  const handleMemo = (user: User) => {
    router.push({
      pathname: '/viewMemo',
      query: { email: user.email },
    });
  };

  const handleApprove = (user: User) => {
    const updatedCustomers = customers.map((customer) =>
      customer === user ? { ...customer, approved: true } : customer
    );
    setCustomers(updatedCustomers);
  };

  const renderEmployeesTable = () => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.email}</td>
            <td>
              <button
                className={styles.button}
                onClick={() => handleCompliment(employee)}
              >
                View Compliments
              </button>
              <button
                className={styles.button}
                onClick={() => handleComplaint(employee)}
              >
                View Complaints
              </button>


            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  const renderCustomersTable = () => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={index}>
            <td>{customer.email}</td>
            <td>
              <button
                className={styles.button}
                onClick={() => handleCompliment(customer)}
              >
                View Compliments
              </button>
              <button
                className={styles.button}
                onClick={() => handleComplaint(customer)}
              >
                View Complaints
              </button>
              {customer.isRejected && (
                <button
                  className={styles.button}
                  onClick={() => handleMemo(customer)}
                >
                  View Memo
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Store Owner Hub</h1>
      <h2 className={styles.subtitle}>Employees</h2>
      {renderEmployeesTable()}
      <h2 className={styles.subtitle}>Customers</h2>
      {renderCustomersTable()}
    </div>
  );
  
  };
  
export default StoreOwnerHub;
