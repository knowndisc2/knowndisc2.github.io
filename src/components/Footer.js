import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/knowndisc/', 
      icon: 'fab fa-instagram',
      color: '#E1306C'
    },
    { 
      name: 'Twitter', 
      url: 'https://x.com/knowndisc2', 
      icon: 'fab fa-twitter',
      color: '#1DA1F2'
    },
    { 
      name: 'YouTube', 
      url: 'https://www.youtube.com/@knowndisc', 
      icon: 'fab fa-youtube',
      color: '#FF0000'
    },
    { 
      name: 'VGen', 
      url: 'https://vgen.co/knowndisc',
      icon: 'fas fa-paint-brush',
      color: '#8A2BE2'
    },
    { 
      name: 'Email', 
      url: 'mailto:knowndisc.questionmail@gmail.com', 
      icon: 'fas fa-envelope',
      color: '#34A853'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.footer 
      className="footer"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      role="contentinfo"
    >
      <div className="footer-content">
        <div className="footer-contact">
          <h2 className="footer-heading">GET IN TOUCH</h2>
          <a 
            href="mailto:knowndisc.questionmail@gmail.com" 
            className="footer-email"
          >
            knowndisc.questionmail@gmail.com
          </a>
        </div>
        
        <motion.div 
          className="social-links"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              variants={item}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              }}
              style={{ '--social-color': social.color }}
              aria-label={social.name}
            >
              <i className={`${social.icon} social-icon`}></i>
            </motion.a>
          ))}
        </motion.div>
        
        <p className="copyright">
          &copy; {currentYear} KNOWNDISC. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
