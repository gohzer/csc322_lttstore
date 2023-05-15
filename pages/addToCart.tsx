// pages/addToCart.tsx

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

// pages/addToCart.tsx
// pages/addToCart.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AddToCart.module.css';
import Navbar from './navbars';
import Head from 'next/head';
import Footer from './footer';
import { getAllComputerParts } from '@/utils/database';
import Link from 'next/link';

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



const AddToCart = () => {
  const router = useRouter();
  const { build } = router.query;
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const initialBuild: Build | null = build ? JSON.parse(decodeURIComponent(build as string)) : null;
  const [suggestedBuild, setSuggestedBuild] = useState<Build | null>(initialBuild);
  console.log("initial build", initialBuild);

 
  useEffect(() => {
    // If suggestedBuild is null, try to load it from localStorage.
    if (suggestedBuild === null && typeof window !== 'undefined') {
      const selectedComponents = JSON.parse(localStorage.getItem('selectedComponents') ?? 'null');
      if (selectedComponents !== null) {
        // Reverse the operation to get suggestedBuild.
        const newSuggestedBuild: Build = {
          title: selectedComponents.title,
          CPU: selectedComponents.CPU,
          Motherboard: selectedComponents.Motherboard,
          Memory: selectedComponents.Memory,
          Storage: selectedComponents.Storage,
          Video_Card: selectedComponents.Video_Card,
          Case: selectedComponents.Case,
          Power_Supply: selectedComponents.Power_Supply,
          price: selectedComponents.price
        };
        setSuggestedBuild(newSuggestedBuild);
      }
    }
  }, []);

  const handleAddToCart = (part: Part) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const updatedCart = [...existingCart, part];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log(`${part.name} added to cart`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // This will hide the message after 3 seconds
  };

  const handleCustomize = (componentType: string) => {
    const components = {
      cpu: suggestedBuild?.CPU,
      ram: suggestedBuild?.Memory,
      mobo: suggestedBuild?.Motherboard,
      gpu: suggestedBuild?.Video_Card,
      ssd: suggestedBuild?.Storage,
      case: suggestedBuild?.Case,
      psu: suggestedBuild?.Power_Supply,
      price: suggestedBuild?.price,
      title: suggestedBuild?.title
  };
  
  // Save these components to local storage.

  if(componentType === "CPU") {
    componentType = "cpu";
  }

  else if(componentType === "Motherboard") {
    componentType = "mobo";
  }

  else if(componentType === "Memory") {
    componentType = "ram";

  }

  else if(componentType === "Storage") {
    componentType = "ssd";

  }

  else if(componentType === "Video_Card") {
    componentType = "GPU";

  }

  else if(componentType === "Case") {
    componentType = "case";

  }

  else if(componentType === "Power_Supply") {
    componentType = "psu";

  }



  localStorage.setItem('selectedComponents', JSON.stringify(components));
  console.log("localstorage",localStorage.getItem('selectedComponents'));  
  router.push(`/customizeOptionPageSB?component=${componentType}`);
  //console.log("localstorage",localStorage.getItem('selectedComponents'));  

  };


  
  return (
    <>
      <Head>
          <title>Shopping Cart | MacroCenter</title>
      </Head>
      <Navbar/>
      <div className={styles.container}>
        {showSuccess && <div className={styles.successMessage}>Success! Added Item to Cart</div>}
        <h1 className={styles.title}>{suggestedBuild ? `Details for ${suggestedBuild.title} computer` : 'Loading...'}</h1>        {suggestedBuild && (
          <>
            <h2 className={styles.componentsHeader}>Components</h2>
            <ul className={styles['partsList']}>
            {Object.entries(suggestedBuild).map(([key, part], index) => 
              key !== 'title' && key !== 'price' ? (
                <li key={index} className={styles['parts-list-item']}>
                  <span>{key.replace("_", " ")}</span>
                  <span className={styles.componentName}>{(part as Part).name} ({(part as Part).type})</span>
                  <span>{(part as Part).cost}</span>
                  <button className={styles.customizeButtonComponent} onClick={() => handleCustomize(key)}>Customize</button>
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
