
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Footer from './footer'
import Head from 'next/head';
import Navbar from './navbars';
import ComputerCards from './computerCards';

export default function Home() {
  return (
    <>
      <Head>
          <title>MacroCenter</title>
      </Head>
      <Navbar/>
      <main>
        <div className='start_build_div'>
          <p id ="build_Machine_p">Build Your Own <br/> Machine</p>
          <button id = "start_build_btn">
            <a href='/buildPC'>Start Build</a>
          </button>
        </div>
      </main>
      <ComputerCards/>
    <Footer/>
    </>
  )
}
