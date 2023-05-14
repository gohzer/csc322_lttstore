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
                    <form className = {styles.form}>
                        <div className = {styles.formgroup}>
                            <label htmlFor="name">Name *</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className = {styles.formgroup}>
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className = {styles.formgroup}>
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" />
                        </div>
                        <div className = {styles.formgroup}>
                            <label htmlFor="message">Message *</label>
                            <textarea id="message" name="message" rows={6} required></textarea>
                        </div>
                        <button className = {styles.button} type="submit">Send</button>
                    </form>
                </div>
            
            </main>

            <Footer/>
        </>
    );
}