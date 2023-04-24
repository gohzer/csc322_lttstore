import React from "react";
import Footer from './footer'
import Head from 'next/head';

export default function Contact()
{
    return (
        <>
            <Head>
                <title>Contact | MacroCenter</title>
            </Head>

            <main>
                <div className="contact-container">
                    <h1>Contact Us</h1>
                    <p>Have a question or comment? Fill out the form below and we'll get back to you as soon as possible.</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea id="message" name="message" rows={6} required></textarea>
                        </div>
                        <button type="submit">Send</button>
                    </form>
                </div>
            
            </main>

            <Footer/>
        </>
    );
}