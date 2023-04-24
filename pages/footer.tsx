import React from "react";

export default function Footer()
{
    return (
        <React.Fragment>
            <footer >
                <div className='footer_div'>
                    <a id = "footer_a" href="/about">About Us</a>
                    <a id = "footer_a" href="/contact">Contact</a>
                    <a id = "footer_a" href="/tos">Terms of Service</a>
                    <a id = "footer_a1" href="/policy">Policy</a>
                </div>
               
                <a id = "footer_a2" href="/">&copy; MacroCenter</a>
            </footer>
        </React.Fragment>
    );
}