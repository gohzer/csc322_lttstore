import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { queryCollection, approveUserFirebase } from '@/utils/database'; 
import styles from '@/styles/viewMemo.module.css';

interface Reject {
  email: string;
  notes: string;
}

const ViewMemo = () => {
  const router = useRouter();
  const [memo, setMemo] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  

  const approveUser = async (email: string) => {
    setMessage('User Approved!');
  }

  useEffect(() => {
    const fetchMemo = async () => {
      const email = router.query.email;
      if (typeof email === 'string') {
        const rejectData: Reject[] = await queryCollection('rejections');
        const userMemo = rejectData.find((reject) => reject.email === email)?.notes;
        setMemo(userMemo || 'No memo found for this user.');
      }
    };

    fetchMemo();
  }, [router.query.email]);

  return (
    <div className={styles.container}>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.content}>
        {memo ? (
          <div>
            <h2 className={styles.title}>Memo for user: {router.query.email} </h2>
            <p className={styles.text}>{memo}</p>
          </div>
        ) : (
          <p className={styles.text}>Loading...</p>
        )}
      </div>
      <button className={styles.button} onClick={() => approveUser(router.query.email as string)}>Approve Customer Application</button>
    </div>
  );
};

export default ViewMemo;
