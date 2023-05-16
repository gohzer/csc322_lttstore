import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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

  const [comments, setComments] = useState<{ [key: number]: string }>({});


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

// in useEffect
useEffect(() => {
  const storedReviews = localStorage.getItem('reviews');
  if (storedReviews) {
    setReviews(JSON.parse(storedReviews));
  }
}, []);

const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newRating = parseInt(e.target.value);
  setNewReview((prevReview) => ({ ...prevReview, rating: newRating }));
};
const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>, partId: number) => {
  const newComment = e.target.value;
  setComments((prevComments) => ({ ...prevComments, [partId]: newComment }));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>, part: ComputerPart) => {
  e.preventDefault();

  
  const newReviewData: Review = {
    id: Date.now(), // Use a unique timestamp as the review ID
    computerPartId: part.id,
    username: newReview.username,
    rating: newReview.rating,
    comment: comments[part.id] || '', // get comment from comments state
  };

  console.log("review",newReviewData.comment); // This will log the comment text


  // Save the review to local storage using the computer part name as a key
  localStorage.setItem(`${part.name}`, JSON.stringify(newReviewData));

  console.log(localStorage.getItem(`${part.name}`));
  // Update the reviews state with the new review
  setReviews((prevReviews) => [...prevReviews, newReviewData]);

  // Clear the new review data
  setNewReview({
    id: 0,
    computerPartId: 0,
    username: '',
    rating: 0,
    comment: '',
  });
};


  const router = useRouter();
  const handleViewReviews = (name: string) => {
    console.log(name);
    router.push(`/ViewReviewsPage/?id=${name}`);
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
                <form onSubmit={(e) => handleSubmit(e, part)}>
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
        onChange={(e) => handleCommentChange(e, part.id)}
        value={comments[part.id] || ''}
      />
                  <br />
                  <button type="submit">Add Review</button>

                  <button type = "button" onClick={() => handleViewReviews(part.name)}>View Reviews
                  </button>
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
