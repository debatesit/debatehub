import "./css/About.css";

import evanPhoto from "../assets/evanPhoto.jpeg"
import maxPhoto from "../assets/maxPhoto.jpeg"
import defaultPhoto from "../assets/defaultPhoto.jpeg"

import { useState } from "react";
import { Link } from "react-router-dom";

function About() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  return (
    <main className="about-page">
      <div className="about-container">

        <h1 className="about-title">About DebateHub</h1>

        {/* Description of DebateHub */}
        <div className="about-box">
          <button className="about-dropdown-header" onClick={() => setOpen1(!open1)}>
            <h2 className="about-subheading">What is DebateHub?</h2>
          </button>

          {open1 && (
            <p className="about-text">
              DebateHub is an online matchmaking platform that pairs users to debate a wide range of 
              current world events. Each debate is evaluated using specific scoring criteria, 
              detailed on the <Link className="about-link" to="/start">start</Link> page, and every match updates a player’s rating to reflect 
              their overall performance.
            </p>
          )}
        </div>

        {/* Description of DebateHub's Goal */}
        <div className="about-box">
          <button className="about-dropdown-header" onClick={() => setOpen2(!open2)}>
            <h2 className="about-subheading">Our Mission</h2>
          </button>

          {open2 && (
            <p className="about-text">
              Whether you're looking to challenge your own views or understand others, 
              DebateHub enables U.S. citizens to engage in ethical discussions about world affairs in a turn-taking format. 
              The purpose of our scoring is to help users understand how to communicate their perspective more clearly, 
              not to declare "winners" or "losers."
            </p>
          )}
        </div>

        {/* List of Contributors */}
        <div className="about-box">
          <button className="about-dropdown-header" onClick={() => setOpen3(!open3)}>
            <h2 className="about-subheading">Our Team</h2>
          </button>

          {open3 && (
            <>
            <div className="team-member">
            <img src={evanPhoto} className="team-photo"/>
            <p className="team-text">
                <a href="https://github.com/Mintels"><span className="team-name">Evan Nicholas</span></a>
                <span className="team-role">— Frontend Engineer</span>
            </p>
            </div>

            <div className="team-member">
            <img src={defaultPhoto} className="team-photo"/>
            <p className="team-text">
                <a href="https://github.com/ZOtherMod"><span className="team-name">Nicolas Tsai</span></a>
                <span className="team-role">— Backend Engineer</span>
            </p>
            </div>

            <div className="team-member">
            <img src={maxPhoto} className="team-photo"/>
            <p className="team-text">
                <a href="https://github.com/defmaxeng"><span className="team-name">Max Eng</span></a>
                <span className="team-role">— Machine Learning Engineer</span>
            </p>
            </div>
            </>
          )}
        </div>

        {/* Emailing */}
        <div className="about-box">
          <button className="about-dropdown-header" onClick={() => setOpen4(!open4)}>
            <h2 className="about-subheading">Contact Us</h2>
          </button>

          {open4 && (
            <p className="about-text">
              We'd love to hear from you! Contact us at <a className="email-link" href="mailto:sitedebate@gmail.com">sitedebate@gmail.com</a>.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}

export default About;