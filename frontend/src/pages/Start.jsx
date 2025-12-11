import styles from './css/Start.module.css';
import testfunction from './js/Functions.js'
import { useState } from "react";

function Start() {
  const [rulesOpen, setRulesOpen] = useState(false);

  const [scoringOpen, setScoringOpen] = useState(false);
  return (
    <main className={styles.Start}>


      {rulesOpen && (
        <div className={styles.popupModal}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupTitle}>Game Rules</h2>
            <ol> 
              <li>No plagiarism — quotes allowed but must be credited.</li>
              <li>No personal attacks or hate speech toward any participant or group.</li>
              <li>Stay on topic and argue the ideas, not the person.</li>
              <li>No threats, harassment, or sharing personal information.</li>
              <li>No spam, trolling, or attempts to disrupt the platform.</li>
              <li> Follow moderator instructions — violations may result in removal.</li>
            </ol>
            <button className={styles.popupButton} onClick={() => setRulesOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {scoringOpen && ( 
        <div className={styles.popupModal}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupTitle}>Scoring System</h2>
            <ul>
              <li>Point 1: You earn points for winning rounds.</li>
              <li>Point 2: Bonus points for creativity.</li>
              <li>Point 3: Deductions for rule violations.</li>
            </ul>
          <button className={styles.popupButton} onClick={() => setScoringOpen(false)}>Close</button>
          </div>
        </div>
      )}


      <div className={styles.mainLeft}>
        <h1 className={styles.mainText}>Join the Queue</h1>
        <h2 className={styles.mainSubtext}>
          Rise up. Persuade. Shape the outcome.
        </h2>
      </div>

      <div className={styles.mainRight}>
        <div className={styles.buttonWrapper}> 
          <button className={styles.joinButton} onClick={() => testfunction()}>Join Match</button>

          <div className={styles.bottomActions}>
            <button
              className={styles.rulesButton}
              onClick={() => setRulesOpen(true)}>
              View Rules
            </button>

            <button className={styles.scoringButton} onClick={() => setScoringOpen(true)}>
              View Scoring
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Start;