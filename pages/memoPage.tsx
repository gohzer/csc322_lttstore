import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@/styles/memoPage.module.css';

const MemoPage = () => {
  const [memo, setMemo] = useState('');
  const router = useRouter();

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement logic to save the memo
    router.push('/employee');
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
