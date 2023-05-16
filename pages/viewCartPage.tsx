// pages/cart.tsx
import React, { useEffect, useState } from 'react';
import styles from '../styles/viewCartPage.module.css';
import Navbar from './navbars';
import Head from 'next/head';
import Footer from './footer';
import { useRouter } from 'next/router';
import { addToPurchased, getNonApprovedUserSet, getNonApprovedUsers, getPurchases } from '@/utils/database';
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
  const [discount, setDiscount] = useState(false);
  const [goodUser, setGoodUser] = useState(false);
  const router = useRouter();
  
  // Function to load the cart from localStorage
  const loadCart = async () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    setCart(savedCart);

    if(auth.currentUser) await getPurchases(auth.currentUser.uid).then(purchs => {
      let mult = purchs.length == 0 ? 0.8 : 1;
      if(mult != 1) setDiscount(true);
      if(goodUser) mult *= .9;
      let prices = 0;
      for(let item in cart) {
        prices += (parseFloat(cart[item].cost.toString()) * mult)
        setPrice(prices);
      }
      setReload(true);
    })
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = (index: number) => {
    let itemPrice = parseFloat(cart[index].cost.toString());
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
    if(auth.currentUser) {
      let balance = parseFloat(localStorage.getItem('balance' + auth.currentUser.email) || '0');
      if(price > balance) {
        alert("Insufficient funds! Get your bread up or remove some items.")
      }
      else {
        await getNonApprovedUserSet().then(async nonApproved => {
          if(auth.currentUser && !nonApproved.has(auth.currentUser.email)) {
              for(let i in cart) {
                let item = cart[i];
                let mult = 1
                if(discount) mult *= 0.8
                if(goodUser) mult *= 0.9
                if(auth.currentUser) addToPurchased(auth.currentUser.uid, item.name, item.type, item.cost * mult);
              }
              handleClearCart();
              let newBal = (balance - (price))
              if(auth.currentUser)
                localStorage.setItem('balance' + auth.currentUser.email, newBal.toString())
              setBalance(newBal);
              setPrice(0);
              alert("Items purchased! The cost has been debited from your account.")
          }
          else alert("you are not approved! cannot purchase items")
        });
        
      }
    } else {
      alert("you are not approved! cannot purchase items")
    }
    
  };

  function handlePurchaseHistory() {
    router.push("/purchaseHistory")
  }

  // Load cart from localStorage when component mounts
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      loadCart();
      if(auth.currentUser) {
        if(!localStorage.getItem('balance' + auth.currentUser.email)) {
          console.log("set")
          localStorage.setItem('balance' + auth.currentUser.email, '0')
        }
        let bal = parseFloat(localStorage.getItem('balance' + auth.currentUser.email) || '0');
        setBalance(bal);
      }
      let item = localStorage.getItem('discount' + auth.currentUser?.email);
      if(item) {
        setGoodUser(true);
      }
    })
  }, [balance, reload]);

  return (
    <>
      <Head>
        <title>Cart | MacroCenter</title>
      </Head>
      <Navbar/>
      
      <div className={styles.container}>
        <h1 className={styles.title}>
          Shopping Cart
          {discount && <p>SPECIAL ONE-TIME OFFER! 20% off!</p>}
          {goodUser && <p>10% good user discount has been applied to your order.</p>}
          </h1>

        <div className={styles.cartlistcontainer}>
        <ul className={styles.cartList}>
          {cart.map((item, index) => (
            <li className={styles.cartItem} key={index}>
              <span>{item.name} ({item.type}) - {item.cost}</span>
              <button className={styles.button} onClick={() => handleRemoveItem(index)}>Remove from cart</button>
            </li>
          ))}
        </ul>
        </div>
       
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
