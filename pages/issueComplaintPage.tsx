import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@/styles/memoPage.module.css';
import { addToDatabase, addUserComplaint, getUserComplaints } from '@/utils/database';

const IssueComplaintPage = () => {
  const [complaint, setComplaint] = useState('');
  const router = useRouter();
  const { email } = router.query;

  const handleComplaintChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComplaint(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addToDatabase('complaints', {
      email: email as string,
      memo: complaint,
    });

    addUserComplaint(email, 'test', complaint);
    console.log(email);

    let n = getUserComplaints(email);

    if((await n).length > 3 ) {
        // do something to notify the customer
    }


    router.push('/employee');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Issue a Complaint</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea className={styles.textarea} value={complaint} onChange={handleComplaintChange} />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default IssueComplaintPage;
