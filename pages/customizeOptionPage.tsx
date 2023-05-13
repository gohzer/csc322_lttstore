import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/customizeOptionPage.module.css'
import Head from 'next/head'
import Navbar from './navbars'
import Footer from './footer'
import { getAllComputerParts } from '@/utils/database';

const CustomizeOptionPage = () => {
  const router = useRouter();
  const { component: componentType } = router.query;

  const [componentItems, setComponentItems] = useState<Array<{name: string, image: string, cost: number, type: string}>>([]);

  useEffect(() => {
      const fetchParts = async () => {
          if(typeof componentType === 'string'){
              
              let parts = await getAllComputerParts();
              //console.log(componentType);
              //console.log(parts);
              let filteredParts = parts.filter(part => part.type === componentType.toLowerCase());
              console.log(filteredParts);
              setComponentItems(filteredParts);
          }
      }

      fetchParts();
  }, [componentType]);

  return (
    <>
      <Head>
        <title>Customize | MacroCenter</title>
      </Head>
      <Navbar/>
      <h1>
        &nbsp;Welcome to the Macrocenter!&nbsp;
        Customize your {componentType}.
      </h1>
      
      <div className={styles.container}>
        <h1>&nbsp;Please choose your {componentType}:&nbsp;</h1>
        <div className={styles.grid}>
          {componentItems.map((item, index) => (
            <div className={styles.gridItem} key={index}>
              <div className={styles.component}>
                <h2 className={styles.name}>{item.name}</h2>
                <img src={item.image} alt={item.name} className={styles.image}/>
                <h3>${item.cost}</h3>
              </div>
              <button className={styles.selectButton}>Select</button>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )

};
  

export default CustomizeOptionPage;
