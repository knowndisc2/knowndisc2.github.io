import React from "react";
import "./CommissionsShopPage.css";

export default function CommissionsShopPage() {
  return (
    <main className="commshop-main">
      <div className="commshop-content">
        <div className="commshop-left">
          <h1 className="commshop-title">COMMISSIONS</h1>
        </div>
        <div className="commshop-right">
          <div className="commshop-section">
            <p className="commshop-intro">I am currently NOT open for custom art commissions!</p>
          </div>
          
          <div className="commshop-section">
            <h2>How it works</h2>
            <p>Describe your idea or project, and I'll create a unique, artwork for you.</p>
          </div>
          
          <div className="commshop-section">
            <h2>Get Started</h2>
            <p>Contact me for pricing, timelines, and to discuss your vision:</p>
            <div className="commshop-links">
              <a 
                href="https://vgen.co/knowndisc" 
                className="commshop-button vgen-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Commission on VGen</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a 
                href="mailto:knowndisc.questionmail@gmail.com" 
                className="commshop-button email-button"
              >
                <span>Email Me</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
