import styles from './css/About.module.css';

import evanPhoto from "../assets/evanPhoto.jpeg"
import maxPhoto from "../assets/maxPhoto.jpeg"
import nicolasPhoto from "../assets/nicolasPhoto.jpg"
import defaultPhoto from "../assets/defaultPhoto.jpeg"

import { useState } from "react";
import { Link } from "react-router-dom";

function About() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  return (
    <main className={styles.aboutPage}>
      <div className={styles.aboutContainer}>

        <h1 className={styles.aboutTitle}>About DebateHub</h1>

        {/* Description of DebateHub */}
        <div className={styles.aboutBox}>
          <button className={styles.aboutDropdownHeader} onClick={() => setOpen1(!open1)}>
            <h2 className={styles.aboutSubheading}>What is DebateHub?</h2>
          </button>

          {open1 && (
            <p className={styles.aboutText}>
              DebateHub is an online matchmaking platform that pairs users to debate a wide range of 
              current world events. Each debate is evaluated using specific scoring criteria, 
              detailed on the <Link className={styles.aboutLink} to="/start">start</Link> page, and every match updates a player’s rating to reflect 
              their overall performance.
            </p>
          )}
        </div>

        {/* Description of DebateHub's Goal */}
        <div className={styles.aboutBox}>
          <button className={styles.aboutDropdownHeader} onClick={() => setOpen2(!open2)}>
            <h2 className={styles.aboutSubheading}>Our Mission</h2>
          </button>

          {open2 && (
            <p className={styles.aboutText}>
              Whether you're looking to challenge your own views or understand others, 
              DebateHub enables U.S. citizens to engage in ethical discussions about world affairs in a turn-taking format. 
              The purpose of our scoring is to help users understand how to communicate their perspective more clearly, 
              not to declare "winners" or "losers."
            </p>
          )}
        </div>

        {/* List of Contributors */}
        <div className={styles.aboutBox}>
          <button className={styles.aboutDropdownHeader} onClick={() => setOpen3(!open3)}>
            <h2 className={styles.aboutSubheading}>Our Team</h2>
          </button>

          {open3 && (
            <>
            <div className={styles.teamMember}>
            <img src={evanPhoto} className={styles.teamPhoto}/>
            <p className={styles.teamText}>
                <a href="https://github.com/Mintels"><span className={styles.teamName}>Evan Nicholas</span></a>
                <span className={styles.teamRole}>— Frontend Engineer</span>
            </p>
            </div>

            <div className={styles.teamMember}>
            <img src={nicolasPhoto} className={styles.teamPhoto}/>
            <p className={styles.teamText}>
                <a href="https://github.com/ZOtherMod"><span className={styles.teamName}>Nicolas Tsai</span></a>
                <span className={styles.teamRole}>— Backend Engineer</span>
            </p>
            </div>

            <div className={styles.teamMember}>
            <img src={maxPhoto} className={styles.teamPhoto}/>
            <p className={styles.teamText}>
                <a href="https://github.com/defmaxeng"><span className={styles.teamName}>Max Eng</span></a>
                <span className={styles.teamRole}>— Machine Learning Engineer</span>
            </p>
            </div>
            </>
          )}
        </div>

        {/* Emailing */}
        <div className={styles.aboutBox}>
          <button className={styles.aboutDropdownHeader} onClick={() => setOpen4(!open4)}>
            <h2 className={styles.aboutSubheading}>Contact Us</h2>
          </button>

          {open4 && (
            <p className={styles.aboutText}>
              We'd love to hear from you! Contact us at <a className={styles.emailLink} href="mailto:sitedebate@gmail.com">sitedebate@gmail.com</a>.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}

export default About;