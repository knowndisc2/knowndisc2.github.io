import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-section-wrapper">
      <div className="about-section-border" />
      <section className="about-section">
        <div className="about-nav">
          Work
          <span className="about-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" style={{verticalAlign:'middle'}}><path d="M4 6l4 4 4-4" stroke="#111" strokeWidth="2" fill="none"/></svg>
          </span>
        </div>
        <div className="about-main">
          <b>
            At Zajno, we know your time is precious, and that’s why we prioritize simplicity and efficiency. Our team has the expertise and creativity to handle everything from research and planning to custom design and development, freeing you from the burden of micromanagement.
          </b>
        </div>
        <div className="about-copyright">©<b>2015-25</b></div>
      </section>
    </div>
  );
}
