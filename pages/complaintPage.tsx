// will show complaints associated with a user to the store owner. 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserComplaints } from '@/utils/database';
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

  return (
    <div className={styles.container}>
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
