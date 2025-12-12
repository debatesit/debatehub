import styles from "./css/Gameplay.module.css";
import "./css/Gameplay.css";

function Matchmaking() {

    return (
    <div className={styles.container}>
        <main>
            <div className={styles.matchmakingContainer}>
                <div className={styles.matchmakingSection}>
                    <h2>Find a Debate</h2>
                    <p className={styles.description}>
                        Join the matchmaking queue to find an opponent with similar skill level.
                    </p>
                    
                    <div id={styles.matchmakingControls} className={styles.controls}>
                        <button id="startMatchmakingButton" className={styles.primaryButton}>
                            Start Matchmaking
                        </button>
                        <button id="stopMatchmakingButton" className="danger-button hidden"> {/* hidden class */}
                            Stop Matchmaking
                        </button>
                    </div>
                    
                    <div id="statusContainer" className="status-container hidden"> {/* hidden class */}
                        <div id="statusText" className={styles.statusText}>
                            Searching for opponent...
                        </div>
                        <div id="queueStatus" className={styles.queueStatus}></div>
                        <div className={styles.loadingDots}>
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    
                    <div id="matchFoundContainer" className="match-found-container hidden"> {/* hidden class */}
                        <h3>Match Found!</h3>
                        <div id="opponentInfo" className={styles.opponentInfo}>
                            <p><strong>Opponent:</strong> <span id="opponentUsername">Unknown</span></p>
                            <p><strong>MMR:</strong> <span id="opponentMMR">Unknown</span></p>
                        </div>
                        <div id="topicInfo" className={styles.topicInfo}>
                            <p><strong>Debate Topic:</strong></p>
                            <div id="debateTopic" className={styles.debateTopic}>Loading topic...</div>
                        </div>
                        <div className={styles.matchActions}>
                            <button id="proceedToDebateButton" className={styles.primaryButton}>
                                Proceed to Debate
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className={styles.infoSection}>
                    <h3>How Matchmaking Works</h3>
                    <ul>
                        <li>Players are matched based on similar MMR (skill level)</li>
                        <li>The longer you wait, the wider the MMR range becomes</li>
                        <li>A random debate topic will be selected for your match</li>
                        <li>You'll have preparation time before the debate begins</li>
                    </ul>
                </div>
            </div>
            
            <div id="messageContainer" className="message-container hidden"> {/* hidden class */}
                <div id="messageText" className={styles.message}></div>
            </div>
            
            <div id="connectionStatus" className={styles.connectionStatus}>
                <span id="connectionIndicator" className="status-indicator offline">●</span> {/* offline class */}
                <span id="connectionText">Connecting...</span>
            </div>
        </main>
    </div>
    );
}

export default Matchmaking 