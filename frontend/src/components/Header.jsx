import styles from './css/Header.module.css'
import defaultPhoto from "../assets/defaultPhoto.jpeg"
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Header() {
    const [LoginWindow, setLoginWindow] = useState(false);
    let isAdmin = false; // Placeholder for admin check logic 
    let isLogged = false; // Placeholder for Login Logic
    return <header className={styles.headerContainer}>
        <div className={styles.leftHeader}>
           <Link to="/" className={styles.logoLink}>
                DebateHub
            </Link>
        </div>
        <div className={styles.midHeader}>
            <Link className={styles.navLink} to="/">Home</Link>
            <Link className={styles.navLink} to="/start">Start</Link>
            <Link className={styles.navLink} to="/about">About</Link>
            {isAdmin && <Link className={styles.adminLink} to="/admin">Admin</Link>}
        </div>
        <div className={styles.rightHeader}>
            {isLogged? (
                <img src={defaultPhoto} className={styles.loginPhoto} onClick={()=>setLoginWindow(!LoginWindow)}/>
            ) : ( 
                <Link className={styles.navLink} to="/login"><div className={styles.signinButton}>Sign in</div></Link>
            )}
        {LoginWindow && isLogged &&
            <div className={styles.loginContainer}>
                <button className={styles.signOut}> Sign Out </button>
            </div>
        }   
        </div> </header>;
    }
export default Header;