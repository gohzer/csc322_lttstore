import React from "react";
import Footer from './footer'
import Head from 'next/head';
import Navbar from "./navbars";
import styles from '@/styles/contact.module.css';

export default function Contact()
{
    return (
        <>
            <Head>
                <title>Contact | MacroCenter</title>
            </Head>

            <Navbar/>
            
            <main>
                <div className = {styles.container}>
                    <h1>Contact Us</h1>
                    <p>Have a question or comment? Fill out the form below and we'll get back to you as soon as possible.</p>
                    <form className = {styles.form } action="https://formsubmit.co/2ef5877edde96976b3777559b5095aea" method="POST">

                          {/* This link to our form page created by FormSubmit.co  https://formsubmit.co/el/zutuxo */}
                         {/* This is the link with encrypted https://formsubmit.co/2ef5877edde96976b3777559b5095aea */}
                         {/* we can be replace 2ef5877edde96976b3777559b5095aea with our email its same thing */}

                         <input type="hidden" name="_captcha" value="false" />
                         <input type="hidden" name="_subject" value="New submission!"></input>
                        <div className = {styles.formgroup}>
                            <label htmlFor="name">Name *</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className = {styles.formgroup}>
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className = {styles.formgroup}>
                            <label htmlFor="message">Message *</label>
                            <textarea id="message" name="message" rows={6} required></textarea>
                        </div>
                        <button className = {styles.button} type="submit">Send</button>
                        <input type="hidden" name="_next" value="http://localhost:3000/contact"></input>
                    </form>
                </div>
            
            </main>

            <Footer/>
        </>
    );
}