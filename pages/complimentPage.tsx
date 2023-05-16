// pages/ComplimentPage.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserCompliments, queryCollection, addUserCompliment } from '@/utils/database';
import styles from '@/styles/complimentPage.module.css';

interface Compliment {
  email: string;
  memo?: string;
}

const ComplimentPage = () => {
  const router = useRouter();
  const [compliments, setCompliments] = useState<Compliment[]>([]);

  useEffect(() => {
    const user = queryCollection('customers');
    console.log("customers",user);
    //const compliments =  getUserCompliments(router.query.email);
    if (router.query.email) {
      getUserCompliments(router.query.email as string)
        .then(setCompliments)
        .catch(console.error);
    }
  }, [router.query.email]);

  async function handleIssueCompliment() {
    console.log('Issue complaint button clicked');
    // Implement your functionality here
    let email = router.query.email;
    addUserCompliment(email, 'by owner so just count', "by store owner");
    console.log(email);

    let n = getUserCompliments(email);
    console.log(n)
    if((await n).length > 3 ) {
        // do something to notify the user 
        // if employee handle differently, if user handle differently. 
    }


  };

  return (
    <div className={styles.container}>
      <button onClick={handleIssueCompliment}>Issue Compliment</button>
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
