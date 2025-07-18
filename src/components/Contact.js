import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <footer className="contact-footer">
      <div className="contact-container">
        <h2 className="contact-title">Contact</h2>
        <div className="contact-info">
          <p>Email: <a href="mailto:your@email.com">your@email.com</a></p>
          <p>Instagram: <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">@yourhandle</a></p>
        </div>
        <div className="contact-note">
          <span>For commissions, collaborations, or questions, please reach out by email or DM.</span>
        </div>
      </div>
      <div className="contact-copyright">
        &copy; {new Date().getFullYear()} Your Name. All rights reserved.
      </div>
    </footer>
  );
}
