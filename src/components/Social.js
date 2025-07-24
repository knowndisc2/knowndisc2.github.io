import React from 'react';
import './Social.css';

const Social = () => {
  return (
    <div className="social-dropdown">
      <button className="social-dropbtn">Social</button>
      <div className="social-dropdown-content">
        <a href="https://www.instagram.com/knowndisc/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i> Instagram
        </a>
        <a href="https://x.com/knowndisc2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i> Twitter
        </a>
        <a href="https://www.youtube.com/@knowndisc" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-youtube"></i> YouTube
        </a>
        <a href="https://vgen.co/knowndisc" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-paint-brush"></i> VGen
        </a>
        <a href="mailto:knowndisc.questionmail@gmail.com">
          <i className="fas fa-envelope"></i> Email
        </a>
      </div>
    </div>
  );
};

export default Social;
