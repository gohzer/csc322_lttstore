// import React from "react";
// import Footer from './footer'
// import Head from 'next/head';
// import Navbar from "./navbars";
// import styles from '@/styles/contact.module.css';
// import { useState } from 'react'



// export default function Contact()
// {

//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [message, setMessage] = useState('')
//     const [submitted, setSubmitted] = useState(false)
    

//     const handleSubmit = (e) => { 
//         e.preventDefault()
//         console.log('Sending')
//       let data = {
//           name,
//           email,
//           message
//         }
//       fetch('/api/contact', {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//         })
//       });
//     return (
//         <>

//             <Head>
//                 <title>Contact | MacroCenter</title>
//             </Head>

//             <Navbar/>
            
//             <main>
//                 <div className = {styles.container}>
//                     <h1>Contact Customer</h1>
//                     <form className = {styles.form }>

                    
//                         <div className = {styles.formgroup}>
//                             <label htmlFor="name">Name *</label>
//                             <input type="text" id="name" onChange={(e)=>{setName(e.target.value)}} name="name" required />
//                         </div>
//                         <div className = {styles.formgroup}>
//                             <label htmlFor="email">Email *</label>
//                             <input type="email" id="email" onChange={(e)=>{setName(e.target.value)}} name="email" required />
//                         </div>
//                         <div className = {styles.formgroup}>
//                             <label htmlFor="message">Message *</label>
//                             <textarea id="message" name="message" onChange={(e)=>{setName(e.target.value)}}  rows={6} required></textarea>
//                         </div>
//                         <button className = {styles.button} type="submit">Send</button>
                       
//                     </form>
//                 </div>
            
//             </main>

//             <Footer/>
//         </>
//     );
// }