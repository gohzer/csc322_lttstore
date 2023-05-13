

import Image from'next/image'
import styles from '@/styles/buildPC.module.css'
import RTX2080 from '../public/RTX2080.jpg'
import motherboard from '../public/motherboard.jpg'
import i9 from '../public/I9Core.jpg'
import Navbar from './navbars'
import Head from 'next/head'
import Footer from './footer'
import { getAllComputerParts } from '@/utils/database';
import { useRouter } from 'next/router';


/* TODO: 
1. Need to add functionality to the customize button
2. when the button is clicked, I need to check for which component the button is clicked, if the button is clicked for CPU
   then i need to go to the customizeOptionPage displaying only the CPUS available. 
3. I also need to check what other components were selected in this buildPC page before going to the customize page, because
   I need to check which (e.g) CPU components are compatible with the motherboard and video card that were selected prior
   and ONLY display the components that are compatible with the selected motherboard and video card. 

4. Same steps need to be taken for all components. 
5. Need to also have an add to cart button that becomes clickable once a component is selected in that row

6.  Maybe I need to make the addtocart button a global variable


*/

const getParts = () => {
  

    let parts = getAllComputerParts();
    parts.then(result => {
      console.log(result);
    });


  };

  export default function BuildPC() {
    const router = useRouter();
    getParts();
    return (
    <>
        <Head>
          <title>Build | MacroCenter</title>
        </Head>
        <Navbar/>
        <h1>
        &nbsp;Welcome to the Macrocenter!&nbsp;
          Build your PC here.
        </h1>
        
        <div className={styles.container}>
            <h1>&nbsp;Please choose your component:&nbsp;</h1>
            <div className={styles.grid}>
                <div className={styles.gridItem}>
                    <h2>CPU</h2>
                    <button className={styles.customizeButton} onClick={() => router.push('/customizeOptionPage?component=CPU')}>Customize</button>
                </div>
                <div className={styles.gridItem}>
                    <h2>Motherboard</h2>
                    <button className={styles.customizeButton} onClick={() => router.push('/customizeOptionPage?component=Motherboard')}>Customize</button>
                </div>
                <div className={styles.gridItem}>
                    <h2>Graphics Card</h2>
                    <button className={styles.customizeButton} onClick={() => router.push('/customizeOptionPage?component=GraphicsCard')}>Customize</button>
                </div>
            </div>
        </div>
        <Footer/>
    </>
    )
}