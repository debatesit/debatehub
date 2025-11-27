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
            <Link className="nav-link" to="/login"><div className="signin-btn">Sign in</div></Link>
        </div> </header>;
    }
export default Header;