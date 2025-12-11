import styles from './css/Login.module.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import testfunction from './js/Functions'
function Login() {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    
    return (
        <main className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <h1 className={styles.loginTitle}>DebateHub</h1>

                <form className={styles.loginForm}>
                    {/* Username */}
                    <input 
                        type="text" 
                        className={styles.loginInput}
                        placeholder="Username"
                        required
                    />

                    {/* Email (signup only) */}
                    {isSignup && (
                        <input 
                            type="email"
                            className={styles.loginInput}
                            placeholder="Email Address"
                            required
                        />
                    )}

                    {/* Password */}
                    <input
                        type="password"
                        className={styles.loginInput}
                        placeholder="Password"
                        required
                    />

                    {/* Re-enter password (signup only) */}
                    {isSignup && (
                        <input
                            type="password"
                            className={styles.loginInput}
                            placeholder="Re-enter Password"
                            required
                        />
                    )}
                    
                    <button type="submit" className={styles.loginButton} onClick={() => testfunction()}>
                        {isSignup ? "Create Account" : "Sign In"}
                    </button>
                </form>

                <div className={styles.signupLink}>
                    <Link className={styles.navLink} to="/passwordreset">Forgot Password?</Link>

                    {isSignup ? (
                       <span className={styles.navLink} onClick={() => setIsSignup(false)}>Back to Login</span>
                    ) : ( 
                        <span className={styles.navLink} onClick={() => setIsSignup(true)}>Sign Up</span>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Login;