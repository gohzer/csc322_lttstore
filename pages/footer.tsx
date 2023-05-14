import React from "react";
import styles from '@/styles/Footer.module.css';

export default function Footer()
{
    return (
        <React.Fragment>
            <footer className = {styles.container}>
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
                <a href="/tos">Terms of Service</a>
                <a href="/policy">Policy</a>
               
                <a className= {styles.a2} href="/">&copy; MacroCenter</a>
            </footer>
        </React.Fragment>
    );
}