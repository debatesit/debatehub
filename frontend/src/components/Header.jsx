import './css/Header.css';

import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Header() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    let isAdmin = true; // Placeholder for admin check logic 
    return <header className="site-header">
        <div className="left-header">
           <Link to="/" className="logo-link">
                <div className="logo">DebateHub</div>
            </Link>
        </div>
        <div className="mid-header">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/start">Start</Link>
            <Link className="nav-link" to="/about">About</Link>
            {isAdmin && <Link className="admin-link" to="/admin">Admin</Link>}
        </div>
        <div className="right-header">
            <Link className="nav-link" to="/login"><div className="signin-btn">Sign in</div></Link>
        </div> </header>;
    }
export default Header;