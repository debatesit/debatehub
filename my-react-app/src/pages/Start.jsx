import { useState } from "react";
import './css/Start.css';

function Start() {
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <main className="Start">

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

            <button className="scoringbutton">
              View Scores
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Start;