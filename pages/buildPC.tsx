import Image from'next/image'
import styles from '@/styles/Home.module.css'
import RTX2080 from '../public/RTX2080.jpg'
import motherboard from '../public/motherboard.jpg'
import i9 from '../public/I9Core.jpg'
// import Link from 'next/link'
import Navbar from './navbars'
import Head from 'next/head'
import Footer from './footer'

export default function BuildPC() {
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
        
        <div>
            <h1>&nbsp;Please choose your component:&nbsp;</h1>
            <ul>
                <li>
                    <h2>&nbsp;CPU: Intel&nbsp;| AMD</h2>
                </li>
                &nbsp;<Image src={i9} alt="Image" className={styles.image}
               width={175}
               height={175}
                />
                <li>
                    <h2>&nbsp;Motherboard:</h2>
                </li>
                &nbsp;<Image src={motherboard} alt="Image" className={styles.image}
              width={175}
              height={175}
                />
                <li>
                    <h2>&nbsp;Graphics card: Geforce RTX &nbsp;|
                        AMD
                    </h2>
                </li>
                &nbsp;<Image src={RTX2080} alt="Image" className={styles.image}
               width={175}
               height={175}
            />
            </ul>
        </div>
        <Footer/>

    </>
    )
}