import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@/styles/memoPage.module.css';
import { addToDatabase, approveUserFirebase } from '@/utils/database';

const MemoPage = () => {
  const [memo, setMemo] = useState('');
  const router = useRouter();
  let email = router.query.email

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addToDatabase('rejections', {
      'email': email,
      'notes': memo
    })

    await approveUserFirebase(email).then(() => {
      // Implement logic to save the memo
      router.push('/employee');
    })
    
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Write a Memo</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={memo}
          onChange={handleMemoChange}
        />
        <button type="submit" className={styles.submitButton}>
        Submit
        </button>
      </form>
    </div>
  );
};

export default MemoPage;
