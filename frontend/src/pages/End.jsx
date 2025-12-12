import styles from './css/Gameplay.module.css';
import "./css/Gameplay.css";

function End() {
    return (
    <div className={styles.container}>
        
        <main>
            <div className={styles.endContainer}>
                <div className={styles.endHeader}>
                    <h2>Debate Finished</h2>
                    <p className={styles.endMessage}>
                        Thank you for participating in this debate session!
                    </p>
                </div>
                
                {/* Topic Section */}
                <div className={styles.topicSection}>
                    <h3>Debate Topic</h3>
                    <div id="finalTopic" className={styles.topicText}>
                        Loading topic...
                    </div>
                </div>
                
                {/* Participants */}
                <div className={styles.participantsSection}>
                    <h3>Participants</h3>
                    <div className={styles.participantsInfo}>
                        <div className={styles.participant}>
                            <span id="participant1" className={styles.participantName}>User 1</span>
                        </div>
                        <div className={styles.vs}>vs</div>
                        <div className={styles.participant}>
                            <span id="participant2" className={styles.participantName}>User 2</span>
                        </div>
                    </div>
                </div>
                
                {/* Debate Log */}
                <div className={styles.finalLogSection}>
                    <h3>Complete Debate Log</h3>
                    <div id="finalDebateLog" className={styles.finalDebateLog}>
                        <div className="log-message system"> {/* system class */}
                            <div className={styles.messageContent}>
                                Loading debate history...
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Statistics */}
                <div className={styles.statisticsSection}>
                    <h3>Debate Statistics</h3>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Total Arguments:</span>
                            <span id="totalArguments" className={styles.statValue}>0</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Debate Duration:</span>
                            <span id="debateDuration" className={styles.statValue}>Unknown</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Your Arguments:</span>
                            <span id="userArguments" className={styles.statValue}>0</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Opponent Arguments:</span>
                            <span id="opponentArguments" className={styles.statValue}>0</span>
                        </div>
                    </div>
                </div>
                
                {/* Actions */} 
                <div className={styles.endActions}>
                    <button id="returnToLobbyButton" className={styles.primaryButton}>
                        Return to Lobby
                    </button>
                    <button id="downloadLogButton" className={styles.secondaryButton}>
                        Download Debate Log
                    </button>
                </div>
                
                {/* Feedback */}
                <div className={styles.feedbackSection}>
                    <h3>Feedback</h3>
                    <p className={styles.feedbackText}>
                        This platform focuses on structured discussion rather than winning or losing. 
                        The goal is to practice argumentation skills and explore different perspectives 
                        on important topics.
                    </p>
                    <div className={styles.feedbackNote}>
                        <em>No scoring or judging is performed - both participants gain equal experience.</em>
                    </div>
                </div>
            </div>
            
            <div id="messageContainer" className="message-container hidden"> {/* hidden class */}
                <div id="messageText" className={styles.message}></div>
            </div>
        </main>
    </div>
    );
}

export default End;
