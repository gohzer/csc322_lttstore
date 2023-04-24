import React from "react";
import Footer from './footer'
import Head from 'next/head';

export default function Policy()
{
    return (
        <>
            <Head>
                <title>Policy | MacroCenter</title>
            </Head>

            <main>
                <div className="policy-container"> 
                    <h1>Privacy Policy</h1>
                    <p>
                    At MacroCenter, we take your privacy very seriously. This policy
                    outlines how we collect, use, and protect your personal information.
                    </p>
                    <h2>Information We Collect</h2>
                    <p>
                    We collect information you provide to us when you register for an
                    account, place an order, or sign up for our newsletter. This
                    information may include your name, email address, and billing and
                    shipping information.
                    </p>
                    <p>
                    We may also collect information about how you use our website and
                    services, including the pages you visit and the products you view or
                    purchase. This information may be collected using cookies or other
                    tracking technologies.
                    </p>
                    <h2>How We Use Your Information</h2>
                    <p>
                    We use your information to provide you with our products and services,
                    including processing your orders and providing customer support. We
                    may also use your information to improve our website and services,
                    and to send you promotional offers and other communications.
                    </p>
                    <h2>How We Protect Your Information</h2>
                    <p>
                    We take reasonable measures to protect your personal information from
                    unauthorized access, use, or disclosure. We use secure server
                    technology and encryption to protect your sensitive information.
                    </p>
                    <h2>Third-Party Disclosure</h2>
                    <p>
                    We do not sell, trade, or otherwise transfer your personal
                    information to outside parties without your consent. This does not
                    include trusted third parties who assist us in operating our website,
                    conducting our business, or providing you with our products and
                    services, as long as these parties agree to keep your information
                    confidential.
                    </p>
                    <h2>Your Consent</h2>
                    <p>
                    By using our website and services, you consent to our privacy policy.
                    </p>
                    <h2>Contact Us</h2>
                    <p>
                    If you have any questions or concerns about our privacy policy, please
                    contact us at privacy@macrocenter.com.
                    </p>
                </div>
            </main>
            <Footer/>
        </>
    );
}