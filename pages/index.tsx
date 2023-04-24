
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Footer from './footer'
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
          <title>MacroCenter</title>
      </Head>
      <main>
        <div className='start_build_div'>
          <p id ="build_Machine_p">Build Your Own <br/> Machine</p>
          <button id = "start_build_btn">Start Build</button>
        </div>
      </main>

    <Footer/>
    </>
  )
}
