// pages/StoreOwnerHub.tsx
import React, { useState, useEffect } from 'react';
import styles from '@/styles/storeOwner.module.css';

interface User {
  name: string;
  email: string;
  approved?: boolean;
}

const StoreOwnerHub = () => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);

  // need to fetch real users
  useEffect(() => {
    setEmployees([
      { name: 'Employee 1', email: 'ex', approved: true },
      { name: 'Employee 2', email: 'ex', approved: true },
    ]);
    setCustomers([
      { name: 'Customer 1', email: 'ex' },
      { name: 'Customer 2', email: 'ex' },
    ]);
  }, []);

  const handleCompliment = (user: User) => {
    console.log(`Complimented ${user.name}`);
  };

  const handleComplaint = (user: User) => {
    console.log(`Complained about ${user.name}`);
  };

  const handleMemo = (user: User) => {
    console.log(`Memo for ${user.name}`);
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
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>
              <button
                className={styles.button}
                onClick={() => handleCompliment(employee)}
              >
                Compliment
              </button>
              <button
                className={styles.button}
                onClick={() => handleComplaint(employee)}
              >
                Complaint
              </button>
              <button
                className={styles.button}
                onClick={() => handleMemo(employee)}
              >
                View Memo
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
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={index}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>
              <button
                className={styles.button}
                onClick={() => handleCompliment(customer)}
              >
                Compliment
              </button>
              <button
                className={styles.button}
                onClick={() => handleComplaint(customer)}
              >
                Complaint
              </button>
              {!customer.approved && (
                <button
                  className={styles.button}
                  onClick={() => handleApprove(customer)}
                >
                  Approve
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
      <h1
        className={styles.title}>Store Owner Hub</h1>
        <h2 className={styles.subtitle}>Employees</h2>
        {renderEmployeesTable()}
        <h2 className={styles.subtitle}>Customers</h2>
        {renderCustomersTable()}
        </div>
        );
        };

        export default StoreOwnerHub;