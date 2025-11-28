import { useState } from "react";
import './css/Start.css';

function Start() {
  const [rulesOpen, setRulesOpen] = useState(false);

  const [scoringOpen, setScoringOpen] = useState(false);
  return (
    <main className="Start">


      {rulesOpen && ( // Test code, rewrite, ol is TEMPORARY.
        <div className="popup-modal">
          <div className="popup-content">
            <h2>Game Rules</h2>
            <p>Here are the rules of the game...</p>
            <ol> 
              <li>Rule 1: Do this.</li>
              <li>Rule 2: Don't do that.</li>
              <li>Rule 3: Always be respectful.</li>
            </ol>
          <button onClick={() => setRulesOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {scoringOpen && ( // Test code, rewrite. 
        <div className="popup-modal">
          <div className="popup-content">
            <h2>Scoring System</h2>
            <p>Here is how the scoring works...</p>
            <ul>
              <li>Point 1: You earn points for winning rounds.</li>
              <li>Point 2: Bonus points for creativity.</li>
              <li>Point 3: Deductions for rule violations.</li>
            </ul>
          <button onClick={() => setScoringOpen(false)}>Close</button>
          </div>
        </div>
      )}


      <div className="main-left">
        <h1 className="main-text">Join the Queue</h1>
        <h2 className="main-subtext">
          Rise up.&nbsp; Persuade.&nbsp; Shape the outcome.
        </h2>
      </div>

      <div className="main-right">
        <div className="button-wrapper">

          <button className="join-button">Join Match</button>

          <div className="bottom-actions">
            <button
              className="rulesbutton"
              onClick={() => setRulesOpen(true)}>
              View Rules
            </button>

            <button className="scoringbutton" onClick={() => setScoringOpen(true)}>
              View Scores
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Start;