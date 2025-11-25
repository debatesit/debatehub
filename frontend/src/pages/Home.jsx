import './css/Home.css'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <div className="hero">
        <h1 className="hero-title">DebateHub</h1>
        <p className="hero-subtext">The #1 platform for thoughtful, ethical back-and-forth discussions.</p>

        <button 
          className="hero-btn"
          onClick={() => navigate('/start')}
        >
          Speak Your Truth
        </button>
      </div>
    </main>
  );
}

export default Home;