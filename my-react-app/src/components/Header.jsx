import './css/Header.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Header() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    
    return <header className="site-header">
        <div className="left-header">
            <div className="logo">DebateHub</div>
        </div>
        <div className="mid-header">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/start">Start</Link>
            <Link className="nav-link" to="/rules">Rules</Link>
            <Link className="nav-link" to="/about">About</Link>
        </div>
        <div className="right-header">
            <div className="signin-btn" onClick={() => setIsSignInOpen(!isSignInOpen)}>Sign in</div>
            <div className={`signin-box ${isSignInOpen ? '' : 'hidden'}`}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            </div>
        </div> </header>;
    }
export default Header;