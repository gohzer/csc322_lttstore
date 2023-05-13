// pages/cart.tsx
import React, { useEffect, useState } from 'react';
import styles from '../styles/viewCartPage.module.css';
import Navbar from './navbars';
import Head from 'next/head';
import Footer from './footer';
import { useRouter } from 'next/router';

interface Part {
  name: string;
  type: string;
  cost: number;
  image: string;
}

const Cart = () => {
  const [cart, setCart] = useState<Part[]>([]);
  const router = useRouter();

  // Function to load the cart from localStorage
  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    setCart(savedCart);
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Function to clear all items from the cart
  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Function to proceed to checkout
  const handleCheckout = () => {
    // Navigate to the checkout page (replace 'checkout' with the path of your checkout page)
    router.push('/checkout');
  };

  // Load cart from localStorage when component mounts
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Head>
        <title>Cart | MacroCenter</title>
      </Head>
      <Navbar/>
      <div className={styles.container}>
        <h1 className={styles.title}>Cart</h1>
        <ul className={styles.cartList}>
          {cart.map((item, index) => (
            <li className={styles.cartItem} key={index}>
              <span>{item.name} ({item.type}) - {item.cost}</span>
              <button className={styles.button} onClick={() => handleRemoveItem(index)}>Remove from cart</button>
            </li>
          ))}
        </ul>
        <button className={`${styles.button} ${styles.clearCartButton}`} onClick={handleClearCart}>Clear Cart</button>
        <button className={`${styles.button} ${styles.checkoutButton}`} onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
      <Footer/>
    </>
  );
};

export default Cart;
