
import styles from './css/Gameplay.module.css';
import "./css/Gameplay.css";
import React, { useEffect } from 'react';
import { wireJudgeButton } from "./js/connect_ai";


function Debate() {
    useEffect(() => {
        wireJudgeButton();
    }, []);
    return (
        <div className={styles.container}>
            <main>
                <div className={styles.debateContainer}>
                    {/* Topic Section */}
                    <div className={styles.topicSection}>
                        <h2>Debate Topic: Is showering while brushing your teeth weird</h2>
                        <div id="topicText" className={styles.topicText}>
                            {/* Loading topic... */}
                        </div>
                    </div>

                    {/* Timer Section */}
                    {/* <div className={styles.timerSection}>
                        <div id="timerContainer" className={styles.timerContainer}>
                            <div id="timerLabel" className={styles.timerLabel}>Pass and play! Write your argument, submit, then give it to your friend</div>
                            <div id="timerDisplay" className={styles.timerDisplay}>00:00</div>
                            <div id="timerProgress" className={styles.timerProgress}>
                                <div id="timerBar" className={styles.timerBar}></div>
                            </div>
                        </div>
                    </div> */}

                    { /* Opponent Info */}
                    {/* <div className={styles.opponentSection}>
                        <h3>Opponent</h3>
                        <div id="opponentInfo" className={styles.opponentInfo}>
                            <span id="opponentUsername">Unknown</span>
                            <span id="opponentMMR" className={styles.mmr}>MMR: Unknown</span>
                        </div>
                    </div> */}

                    { /* Debate Log */}
                    <div className={styles.debateLogSection}>
                        <h3>Debate Log</h3>
                        <div id="debateLog" className={styles.debateLog}>
                            <div className="log-message system"> {/* system class */}
                                <div className={styles.messageContent}>
                                </div>
                            </div>
                        </div>
                    </div>

                    { /* Input Section */}
                    <div className={styles.inputSection} id="inputSection">
                        <div id="turnStatus" className={styles.turnStatus}>
                            Pass and play! Write your argument, submit, then give it to your friend
                        </div>

                        <div id="argumentInputContainer" className="argument-input-container hidden"> {/* hidden class */}
                            <div className={styles.inputHeader}>
                                <span id="inputLabel">Your Argument</span>
                                <span id="characterCount" className={styles.characterCount}>0/1000</span>
                            </div>
                            <textarea
                                id="argumentInput"
                                placeholder="Enter your argument here... (max 1000 characters)"
                                maxlength="1000"
                                rows="4"
                            ></textarea>
                            <div className={styles.inputControls}>
                                <button id="submitArgumentButton" className={styles.primaryButton}>
                                    Submit Argument
                                </button>
                                <button id="clearArgumentButton" className={styles.secondaryButton}>
                                    Clear
                                </button>
                                <button id="judgeDebateButton" className={styles.primaryButton}>
                                    Judge Debate
                                </button>
                            </div>
                        </div>
                        <textarea id="out" contentEditable="false">Debate Output</textarea>

                        {/* <div id="waitingMessage" className="waiting-message hidden"> {/* hidden class *
                            Waiting for opponent's argument...
                        </div> */}
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

export default Debate;