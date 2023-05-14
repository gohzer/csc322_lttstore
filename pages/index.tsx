
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
        <div className={styles.startbuilddiv}>
          <h1 className={styles.buildMachinep}>Build Your Own Machine</h1>
          <button className={styles.startbuildbtn}>
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
