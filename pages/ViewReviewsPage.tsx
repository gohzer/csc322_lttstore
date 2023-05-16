import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Review {
  id: number;
  computerPartId: number;
  username: string;
  rating: number;
  comment: string;
}

const ViewReviewsPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = () => {
      const storedReviewKeys = Object.keys(localStorage).filter(key => key.startsWith('review-'));
      const filteredReviews: Review[] = storedReviewKeys.map(key => JSON.parse(localStorage.getItem(key) || ''));
      const reviewsForProduct = filteredReviews.filter(review => review.computerPartId === parseInt(productId as string));
      setReviews(reviewsForProduct);
    };

    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h1>Reviews for Product ID: {productId}</h1>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>Username: {review.username}</h3>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewReviewsPage;