import './css/Passwordreset.css';

function Passwordreset() {
  return (
  
    <main className="reset-page">
      <div className="reset-container">
        <h1 className="reset-title">Password Reset</h1>
        <h3 className="reset-subtitle">Enter your email to receive a password reset link.</h3>
        
        <form className="reset-form">
          <input 
            type="email" 
            className="reset-input"
            placeholder="Enter your email address"
            required
          />
          <button type="submit" className="reset-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </main>

);
}

export default Passwordreset;