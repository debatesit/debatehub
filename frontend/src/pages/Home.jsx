import styles from './css/Home.module.css'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <main className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>DebateHub</h1>
        <p className={styles.heroSubtext}>The #1 platform for thoughtful, ethical back-and-forth discussions.</p>

        <button 
          className={styles.heroBtn}
          onClick={() => navigate('/start')}
        >
          Speak Your Truth
        </button>
      </div>
    </main>
  );
}

export default Home;