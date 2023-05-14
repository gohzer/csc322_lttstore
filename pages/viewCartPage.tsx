// pages/cart.tsx
import React, { useEffect, useState } from 'react';
import styles from '../styles/viewCartPage.module.css';
import Navbar from './navbars';
import Head from 'next/head';
import Footer from './footer';
import { useRouter } from 'next/router';
import { addToPurchased, getNonApprovedUserSet, getNonApprovedUsers } from '@/utils/database';
import { auth } from "../firebase/config"

interface Part {
  name: string;
  type: string;
  cost: number;
  image: string;
}

const Cart = () => {
  const [cart, setCart] = useState<Part[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [reload, setReload] = useState(false);
  const [balance, setBalance] = useState(0);
  const router = useRouter();
  
  // Function to load the cart from localStorage
  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    setCart(savedCart);
    let prices = 0;
    for(let item in cart) {
      prices += cart[item].cost
      setPrice(prices);
    }
    setReload(true);
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = (index: number) => {
    let itemPrice = cart[index].cost;
    setPrice(price - itemPrice);
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
  const handleCheckout = async () => {
    // Navigate to the checkout page (replace 'checkout' with the path of your checkout page)
    let balance = parseFloat(localStorage.getItem('balance') || '0');
    if(price > balance) {
      alert("Insufficient funds! Get your bread up or remove some items.")
    }
    else {
      await getNonApprovedUserSet().then(nonApproved => {
        if(auth.currentUser && nonApproved.has(auth.currentUser.email)) {
          for(let i in cart) {
            let item = cart[i];
            addToPurchased(auth.currentUser.uid, item.name, item.type, item.cost);
          }
          handleClearCart();
          let newBal = (balance - price)
          localStorage.setItem('balance', newBal.toString())
          setBalance(newBal);
          setPrice(0);
          alert("Items purchased! The cost has been debited from your account.")
        }
        else alert("you are not approved! cannot purchase items")
      });
      
    }
  };

  function handlePurchaseHistory() {
    router.push("/purchaseHistory")
  }

  // Load cart from localStorage when component mounts
  useEffect(() => {
    loadCart();
    let bal = parseFloat(localStorage.getItem('balance') || '0');
    setBalance(bal);
  }, [reload]);

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
        <div className={styles.cartContainer}>
          <button className={`${styles.button} ${styles.clearCartButton}`} onClick={handleClearCart}>Clear Cart</button>
          <button className={`${styles.button} ${styles.clearCartButton}`} onClick={handlePurchaseHistory}>View Purchase History</button>
          <button className={`${styles.button} ${styles.checkoutButton}`} onClick={handleCheckout}>Proceed to Checkout</button>
          <p className={styles.cost}>Cost: {price}</p>
          <p className={styles.cost}>Balance: {balance}</p>
        </div>
        
      </div>
      <Footer/>
    </>
  );
};

export default Cart;
