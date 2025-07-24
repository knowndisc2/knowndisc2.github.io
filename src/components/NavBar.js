import React, { useEffect, useState, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "./Logo";
import "./NavBar.css";

const NavBar = () => {
  const { scroll } = useLocomotiveScroll();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  // Handle scroll to hide/show navbar and add scrolled state
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class based on scroll position
    if (currentScrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    
    // Show/hide navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY || currentScrollY < 10) {
      // Scrolling up or at top
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change or when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          !event.target.closest('.nav-links') && 
          !event.target.closest('.menu-button-container')) {
        toggleMenu();
      }
    };

    // Close menu on route change
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location, isMenuOpen]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  // Smooth scroll to section
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    
    if (element) {
      // Close mobile menu if open
      if (isMenuOpen) {
        toggleMenu();
      }
      
      // Use Locomotive Scroll if available, otherwise use native scroll
      if (scroll) {
        scroll.scrollTo(element, {
          offset: -100,
          duration: 1.2,
          easing: [0.25, 0.0, 0.35, 1.0]
        });
      } else {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  // Animation variants for the navbar
  const navVariants = {
    visible: { 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        mass: 0.8
      } 
    },
    hidden: { 
      y: '-100%',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        mass: 0.8
      } 
    }
  };
  
  // Animation variants for mobile menu items
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  };

  // Navigation links data
  const navLinks = [
    { to: "/", text: "Home", target: "#home" },
    { to: "/portfolio", text: "Portfolio", target: "#portfolio" },
    { to: "/about", text: "About", target: "#about" },
    { to: "/commissions", text: "Commissions", target: "#commissions" }
  ];

  return (
    <motion.nav 
      className={`main-nav ${!isVisible ? 'hide' : ''} ${isScrolled ? 'scrolled' : ''}`}
      ref={navRef}
      initial={false}
      animate={isVisible ? 'visible' : 'hidden'}
      variants={navVariants}
    >
      <NavLink to="/" className="logo-link" aria-label="Home">
        <Logo />
      </NavLink>
      
      <input 
        type="checkbox" 
        id="menu-toggle" 
        className="menu-toggle" 
        checked={isMenuOpen}
        onChange={toggleMenu}
        aria-label="Toggle navigation menu"
      />
      <label 
        htmlFor="menu-toggle" 
        className="menu-button-container"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
      >
        <span className="sr-only">Menu</span>
        <span className="menu-button"></span>
      </label>
      
      <AnimatePresence>
        <motion.ul 
          className="nav-links" 
          ref={menuRef}
          id="primary-navigation"
          initial={false}
          animate={isMenuOpen ? 'visible' : 'hidden'}
        >
          {navLinks.map((link, index) => (
            <motion.li 
              key={link.to}
              custom={index}
              initial="hidden"
              animate={isMenuOpen ? 'visible' : 'hidden'}
              variants={menuItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                to={link.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.target)}
              >
                {link.text}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
      
      {/* Add focus trap for accessibility when menu is open */}
      {isMenuOpen && (
        <div 
          className="menu-overlay" 
          onClick={toggleMenu}
          role="button"
          tabIndex="-1"
          aria-label="Close menu"
        />
      )}
    </motion.nav>
  );
};

// Add styles for the menu overlay and focus trap
const styles = `
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  .menu-toggle:checked ~ .menu-overlay {
    opacity: 1;
    pointer-events: auto;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

// Add styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);
