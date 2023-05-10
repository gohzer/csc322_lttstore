// pages/addToCart.tsx
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AddToCart.module.css';
import Navbar from './navbars';
import Head from 'next/head';
import Footer from './footer';

const AddToCart = () => {
  const router = useRouter();
  const { type, specs, price } = router.query;

  const parsedSpecs = specs ? JSON.parse(decodeURIComponent(specs as string)) : {};

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const newItem = {
      type,
      specs: parsedSpecs,
      price,
    };
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log(`${type} added to cart`);
  };

  const checkCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    console.log(cart);
  };

  // Define a list of component parts.
  const componentParts = ["CPU", "Motherboard", "Memory", "Storage", "Video Card", "Case", "Power Supply"];

  return (
    <>
      <Head>
          <title>Shopping Cart | MacroCenter</title>
      </Head>
      <Navbar/>
      <div className={styles.container}>
        <h1 className={styles.title}>{type ? `Details for ${type} computer` : 'Loading...'}</h1>
        {type && (
          <>
            <h2 className={styles.componentsHeader}>Component</h2>
            <ul className={styles['partsList']}>
              {componentParts.map((part, index) => (
                <li key={index} className={styles['parts-list-item']}>
                  <span>{part}:</span> <span>{parsedSpecs[part]}</span>
                </li>
              ))}
            </ul>
            <p>Price: {price}</p>
            <div className={styles.buttonContainer}>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className={styles.checkCartButton} onClick={checkCart}>
              Check Cart
            </button>
            </div>
          </>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default AddToCart;
