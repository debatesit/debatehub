import styles from './css/Header.module.css';
import defaultPhoto from "../assets/defaultPhoto.jpeg";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Header() {
    const [LoginWindow, setLoginWindow] = useState(false);

    let isAdmin = false; // PLACE HOLDER - replace with actual admin check BACKEND
    let isLogged = true; // PLACE HOLDER - replace with actual login check BACKEND

    return (
        <header className={styles.headerContainer}>
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
                {isLogged ? (
                
                    <div className={styles.profileWrapper}> 
                        <img
                            src={defaultPhoto}
                            className={styles.loginPhoto}
                            onClick={() => setLoginWindow(!LoginWindow)}
                        />

                        {LoginWindow && (
                         
                            <div className={styles.loginContainer}> 
                                <div className={styles.userInfo}> 
                                    <span id="usernameDisplay">Welcome, User</span>
                                    <span id="mmrDisplay">MMR: 1000</span>
                                  
                                    <button id="logoutButton" className={styles.signOut}>Sign Out</button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link className={styles.navLink} to="/login">
                        <div className={styles.signinButton}>Sign in</div>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
