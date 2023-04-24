// pages/addToCart.tsx
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AddToCart.module.css';



const AddToCart = () => {
  const router = useRouter();
  const { type, specs, price } = router.query;

  const parsedSpecs = specs ? JSON.parse(decodeURIComponent(specs as string)) : [];

  const handleAddToCart = () => {
    // Implement your "Add to Cart" functionality here
    console.log(`${type} added to cart`);
  };

  return (
    <div>
      <h1>{type ? `Details for ${type} computer` : 'Loading...'}</h1>
      {type && (
        <>
          <ul>
            {parsedSpecs.map((spec: string, index: number) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
          <p>Price: {price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </>
      )}
    </div>
  );
};

export default AddToCart;
