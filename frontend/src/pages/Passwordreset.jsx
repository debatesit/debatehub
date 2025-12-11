import styles from './css/Passwordreset.module.css';
import testfunction from './js/Functions'
function Passwordreset() {
  return (
  
    <main className={styles.resetPage}>
      <div className={styles.resetContainer}>
        <h1 className={styles.resetTitle}>Password Reset</h1>
        <h3 className={styles.resetSubtitle}>Enter your email to receive a password reset link.</h3>
        
        <form className={styles.resetForm}>
          <input 
            type="email" 
            className={styles.resetInput}
            placeholder="Enter your email address"
            required
          />
          <button type="submit" className={styles.resetButton} onClick={() => testfunction()}>
            Send Reset Link
          </button>
        </form>
      </div>
    </main>

);
}

export default Passwordreset;