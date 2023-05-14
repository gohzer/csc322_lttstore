import React from "react";
import Footer from './footer'
import Head from 'next/head';
import Navbar from "./navbars";
import styles from '@/styles/tos.module.css';
export default function TOS()
{
    return (
        <>
            <Head>
                <title>Terms | MacroCenter</title>
            </Head>

            <Navbar/>
            <main>
                <div className={styles.container}>
                    <h1>Terms of Service</h1>
                    <p>Please read these terms of service ("terms", "terms of service") carefully before using macrocenter.com website (the "service") operated by MacroCenter ("us", 'we", "our").</p>

                    <h2>Conditions of Use</h2>
                    <p>We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services, or make a purchase, you accept the following conditions. This is why we urge you to read them carefully.</p>

                    <h2>Privacy Policy</h2>
                    <p>Before you continue using our website, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.</p>

                    <h2>License and Site Access</h2>
                    <p>We grant you a limited license to access and make personal use of this website. You are not allowed to download or modify it. This may be done only with written consent from us.</p>

                    <h2>User Account</h2>
                    <p>If you are an owner of an account on this website, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password.</p>

                    <h2>Modification of These Terms of Use</h2>
                    <p>We reserve the right to change these terms of service at any time. You acknowledge and agree that it is your responsibility to review this website and these terms of service periodically, and to be aware of any modifications. Your continued use of the website after such modifications will constitute your acknowledgement and agreement to the new terms of service.</p>

                    <h2>Termination</h2>
                    <p>We reserve the right to terminate your access to the website and the related services or any portion thereof at any time, without notice.</p>

                    <h2>Governing Law</h2>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                 </div>
            </main>

            <Footer/>
        </>
    );
}