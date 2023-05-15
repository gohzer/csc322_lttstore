// pages/addToCart.tsx
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AddToCart.module.css';
import Navbar from './navbars';
import Head from 'next/head';
import Footer from './footer';
import { getAllComputerParts } from '@/utils/database';
import Link from 'next/link';


/* TODO: Fix up this cart PAGE
1. In the home page, for the suggested build, have a set of parts associated with each build. use the firebase api
2. when clicking the suggested build, the user will be taken to a page that shows all of the parts from the
  suggested build. 
  ---done up to here
3. the user will have the option to modify a part in place by clicking a "customize" button
4. Next to the customize button will be an "addtoCart" button that adds the individual component to the cart
5. the addtocart button should be a global button of sort that can be used across other pages

TODO: CART Page
1. User will  be shown all of the parts they have in their cart.
2. They will be given the option to checkout, delete an item from the cart or clear their entire cart. 
*/

interface Part {
  name: string;
  type: string;
  cost: number;
  image: string;
}

interface Build {
  title: string;
  CPU: Part;
  Motherboard: Part;
  Memory: Part;
  Storage: Part;
  Video_Card: Part;
  Case: Part;
  Power_Supply: Part;
  price: string;
}

const clearCart = () => {
  // setCart([]);
  localStorage.removeItem('cart');
};

const AddToCart = () => {
  const router = useRouter();
  const { build } = router.query;

  const suggestedBuild: Build | null = build ? JSON.parse(decodeURIComponent(build as string)) : null;

  const handleAddToCart = (part: Part) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const updatedCart = [...existingCart, part];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log(`${part.name} added to cart`);
  };


  const checkCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    console.log(cart);

    let parts = getAllComputerParts();
    // parts.then(result => {
    //   console.log(result);
    // });
    //console.log(suggestedBuild);
    //console.log(suggestedBuild.keys());

  };

  return (
    <>
      <Head>
          <title>Shopping Cart | MacroCenter</title>
      </Head>
      <Navbar/>
      <div className={styles.container}>
        <h1 className={styles.title}>{suggestedBuild ? `Details for ${suggestedBuild.title} computer` : 'Loading...'}</h1>
        {suggestedBuild && (
          <>
            <h2 className={styles.componentsHeader}>Components</h2>
            <ul className={styles['partsList']}>
            {Object.entries(suggestedBuild).map(([key, part], index) => 
              key !== 'title' && key !== 'price' ? (
                <li key={index} className={styles['parts-list-item']}>
                  <span>{key.replace("_", " ")}</span>
                  <span className={styles.componentName}>{(part as Part).name} ({(part as Part).type})</span>
                  <span>{(part as Part).cost}</span>
                  <button className={styles.customizeButtonComponent}>Customize</button>
                  <button className={styles.addToCartButtonComponent} onClick={() => handleAddToCart(part as Part)}>Add to cart</button>
                </li>
              ) : null
            )}
            </ul>
            <p className={styles.price}>Price: {suggestedBuild.price}</p>
          </>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default AddToCart;