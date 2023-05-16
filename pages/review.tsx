import { useState, useEffect } from 'react';
import { getAllComputerParts} from '@/utils/database';
import styles from '@/styles/reviewsPage.module.css';
import Footer from './footer'
import Head from 'next/head';
import Navbar from './navbars';

interface ComputerPart {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  price: number;
}

interface Review {
  id: number;
  computerPartId: number;
  username: string;
  rating: number;
  comment: string;
}

const ReviewsPage = () => {
  const [computerParts, setComputerParts] = useState<ComputerPart[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]); // initialize with empty array
  const [newReview, setNewReview] = useState<Review>({
    id: 0,
    computerPartId: 0,
    username: '',
    rating: 0,
    comment: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const parts = await getAllComputerParts();
      setComputerParts(parts);
      setReviews(parts.map((part) => ({ // initialize with correct computerPartId
        id: 0,
        computerPartId: part.id,
        username: '',
        rating: 0,
        comment: '',
      })));
    };
    fetchData();
  }, []);

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRating = parseInt(e.target.value);
    setNewReview({ ...newReview, rating: newRating });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newComment = e.target.value;
    const updatedReviews = [...reviews];
    updatedReviews[index] = { ...updatedReviews[index], comment: newComment };
    setReviews(updatedReviews);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const computerPartId = id;
    const { username, rating, comment } = newReview;
    setNewReview({
      id: id,
      computerPartId: computerPartId,
      username: username,
      rating: rating,
      comment: comment,
    });
  };

  return (
    <>
      <Head>
          <title>MacroCenter</title>
      </Head>

      <Navbar/>

      <div className={styles.container}>
        <h1>Leaders in Reliable and Powerful Computer Parts</h1>
        <h2>Review Products</h2>
        <div className={styles.grid}>
          {computerParts.map((part) => (
            <div className={styles.card} key={part.id}>
              <h2>{part.name}</h2>
              <p>{part.description}</p>
              <p>Price: ${part.price}</p>
              <img src={part.image} alt={part.name} className={styles.image} />
                <form onSubmit={(e) => handleSubmit(e, part.id)}>
                  <label htmlFor={`rating-${part.id}`}>Rating:</label>
                  <select id={`rating-${part.id}`} onChange={handleRatingChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <br />
                  <label htmlFor={`comment-${part.id}`}>Comment:</label>
                  <br />
                  <textarea
                    id={`comment-${part.id}`}
                    rows={5}
                    cols={38}
                    onChange={(e) => {
                      const index = computerParts.findIndex((p) => p.id === part.id);
                      handleCommentChange(e, index);
                    }}
                    value={reviews.find((review) => review.computerPartId === part.id)?.comment || ''}
                  />
                  <br />
                  <button type="submit">Add Review</button>
                </form>
              </div>
          ))}
        </div>
      </div>
      
      <Footer/>
    </>
    
  );
};

export default ReviewsPage;
