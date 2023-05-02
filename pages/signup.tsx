
import Link from "next/link";
import styles from "../styles/Auth.module.css";
import { useState, FormEvent } from "react";
import { signIn, signUp } from '../utils/users'
import { useRouter } from 'next/router';
import Navbar from "./navbars";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // User login authentication
    signUp(email, password)
  }
  return(
    <div>
      <Navbar />
    <div className={styles.container}>
      
      <div className={styles.card}>
        <h1 className={styles.heading}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>
        <br></br>
        <div className={styles.links}>
          <Link className={styles.new} href="/signin">Not New? Sign In</Link>
        </div>
      </div>
    </div>
    </div>
  )
}