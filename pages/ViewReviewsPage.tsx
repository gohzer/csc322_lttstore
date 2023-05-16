import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/viewReviewsPage.module.css';

interface Review {
  id: number;
  computerPartId: number;
  username: string;
  rating: number;
  comment: string;
}

const ViewReviewsPage = () => {
  const router = useRouter();
  const partName = router.query.id; // Get the partName from the query parameters

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Fetch the review by part name from local storage
    const review = localStorage.getItem(`${partName}`);

    // If the review exists, add it to the reviews state
    if (review) {
      setReviews([JSON.parse(review)]);
    }
  }, [partName]); // Add partName as a dependency to the useEffect

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reviews for {partName}</h1>
      <div className={styles.reviews}>
        {reviews.map(review => (
          <div key={review.id} className={styles.review}>
            <h2 className={styles.username}>{review.username}</h2>
            <p className={styles.rating}>Rating: {review.rating}</p>
            <p className={styles.comment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReviewsPage;
