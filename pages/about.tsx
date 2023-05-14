import React from "react";
import Footer from './footer'
import Head from 'next/head';
import Navbar from "./navbars";
import styles from '@/styles/About.module.css';

export default function About()
{
    return (
        <>
            <Head>
                <title>About | MacroCenter</title>
            </Head>

            <Navbar/>
            <main>
            <div className={styles.container}>
                <h1>About MacroCenter</h1>
                <p>
                    Founded in 2023, MacroCenter is a leading retailer of computer hardware, software, and accessories in the United States. Our mission is to provide our customers with the best selection of high-quality computer products at competitive prices, while delivering exceptional customer service and technical support.
                </p>
                <p>
                    At MacroCenter, we understand that building and maintaining a computer can be a challenging and sometimes daunting task. That's why we offer a range of services and resources to help our customers succeed, including expert advice, online forums, and easy-to-use configurators that simplify the process of building a custom PC.
                </p>
                <h2>Our Team</h2>
                <p>
                    Our team at MacroCenter is made up of experienced computer enthusiasts who are passionate about technology and committed to helping our customers succeed. From our sales representatives to our technical support staff, every member of our team is dedicated to providing the highest level of service and support to our customers.
                </p>
                <p>
                    If you have any questions or feedback, please don't hesitate to <a href="/contact">contact us</a>. We're always happy to help!
                </p>
            </div>
            
            </main>

            <Footer/>
        </>
    );
}