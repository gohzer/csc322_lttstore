
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Footer from './footer'
import Head from 'next/head';
import Navbar from './navbars';
import ComputerCards from './computerCards';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"
import { getAllComputerParts } from "../utils/database"

export default function Home() {
  return (
    <>
      <Head>
          <title>MacroCenter</title>
      </Head>

       
      <div>
      <Navbar /> 
        <div className={styles.start_build_div}>
          <p className={styles.build_Machine_p}>Build Your Own Machine</p>
          <button className={styles.start_build_btn}>
            <a href='/buildPC'>Start Build</a>
          </button>
          
        </div>

        <div className={styles.cards}>
          <ComputerCards />
        </div>
      </div>
      
    <Footer/>
    </>
  )
}
