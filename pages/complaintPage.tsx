// pages/ComplaintPage.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserComplaints, addUserComplaint } from '@/utils/database';
import styles from '@/styles/complaintPage.module.css';

interface Complaint {
  email: string;
  memo?: string;
}

const ComplaintPage = () => {
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    if (router.query.email) {
      getUserComplaints(router.query.email as string)
        .then(setComplaints)
        .catch(console.error);
    }
  }, [router.query.email]);

  async function handleIssueComplaint() {
    console.log('Issue complaint button clicked');
    // Implement your functionality here
    let email = router.query.email;
    addUserComplaint(email, 'by owner so just count', "by store owner");
    console.log(email);

    let n = getUserComplaints(email);
    console.log(n)
    if((await n).length > 3 ) {
        // do something to notify the customer
    }


  };

  return (
    <div className={styles.container}>
      <button onClick={handleIssueComplaint}>Issue Complaint</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Complaint</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td>{complaint.email}</td>
              <td>{complaint.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintPage;
