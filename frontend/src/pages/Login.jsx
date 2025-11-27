import './css/Login.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);

    return (
        <main className="login-page">
            <div className="login-container">
                <h1 className="login-title">DebateHub</h1>

                <form className="login-form">
                    {/* Username */}
                    <input 
                        type="text" 
                        className="login-input"
                        placeholder="Username"
                        required
                    />

                    {/* Email (signup only) */}
                    {isSignup && (
                        <input 
                            type="email"
                            className="login-input"
                            placeholder="Email Address"
                            required
                        />
                    )}

                    {/* Password */}
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Password"
                        required
                    />

                    {/* Re-enter password (signup only) */}
                    {isSignup && (
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Re-enter Password"
                            required
                        />
                    )}

                    <button type="submit" className="login-button">
                        {isSignup ? "Create Account" : "Sign In"}
                    </button>
                </form>

                <div className="signup-link">
                    <Link className="nav-link" to="/passwordreset">Forgot Password?</Link>

                    {/* Instead of a Link → toggle signup */}
                    {!isSignup ? (
                        <span className="nav-link" onClick={() => setIsSignup(true)}>Sign Up</span>
                    ) : (
                        <span className="nav-link" onClick={() => setIsSignup(false)}>Back to Login</span>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Login;