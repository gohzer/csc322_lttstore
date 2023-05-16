import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@/styles/memoPage.module.css';
import { approveUserFirebase, getNonApprovedUsers, queryCollection, addToDatabase, addUserComplaint, addEmployeeCompliment, getUserCompliments, getUserComplaints, addUserCompliment } from "@/utils/database";

const IssueComplimentPage = () => {
  const [compliment, setCompliment] = useState('');
  const router = useRouter();
  const { email } = router.query;

  const handleComplimentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCompliment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addToDatabase('compliments', {
      email: email as string,
      memo: compliment,
    });

    // add user compliment handle what to do when compliment exceeds 3. 
    addUserCompliment(email, "test", compliment);
    console.log(email);


    let n = getUserCompliments(email);

    if((await n).length > 3 ) {
        // do something to notify the customer
    }



    router.push('/employee');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Issue a Compliment</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={compliment}
          onChange={handleComplimentChange}
        />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default IssueComplimentPage;
