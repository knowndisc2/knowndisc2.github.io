


import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-section-wrapper">
      <section className="about-section">
        <div className="about-nav">
          <button className="about-nav-btn" aria-label="Work">
          About Me
            <span className="about-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" stroke="#111" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </button>
        </div>
        <div className="about-main">
          <p>
            <b>I'm an art beginner, who's mostly into drawing anime characters. I started drawing for the fun of it.</b> It turned into an addiction.
          </p>
        </div>
      </section>
    </div>
  );
}
