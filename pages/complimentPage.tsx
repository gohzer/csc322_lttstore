// will show compliments associated with a user to the storeowner

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserCompliments } from '@/utils/database';
import styles from '@/styles/complimentPage.module.css';

interface Compliment {
  email: string;
  memo?: string;
}

const ComplimentPage = () => {
  const router = useRouter();
  const [compliments, setCompliments] = useState<Compliment[]>([]);

  useEffect(() => {
    if (router.query.email) {
      getUserCompliments(router.query.email as string)
        .then(setCompliments)
        .catch(console.error);
    }
  }, [router.query.email]);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Compliment</th>
          </tr>
        </thead>
        <tbody>
          {compliments.map((compliment, index) => (
            <tr key={index}>
              <td>{compliment.email}</td>
              <td>{compliment.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplimentPage;
