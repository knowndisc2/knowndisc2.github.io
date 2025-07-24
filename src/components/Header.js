import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import ContactForm from './ContactForm';

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>KNOWNDISC</h1>
            </Link>
          </div>
          
          {/* Mobile menu button - single arrow */}
          {isMobile && (
            <button 
              className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            />
          )}
          
          <nav className={`main-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>HOME</Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>ABOUT ME</Link>
            <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>PORTFOLIO</Link>
            <Link to="/commissions" className={`nav-link ${location.pathname === '/commissions' ? 'active' : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>COMMISSIONS</Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={() => isMobile && setIsMenuOpen(false)}>CONTACT</Link>
          </nav>
        </div>
      </header>
      
      {/* Contact Form Section - Only shown on contact page */}
      {location.pathname === '/contact' && (
        <div className="contact-form-container" style={{
          padding: '80px 20px',
          backgroundColor: '#0a0a0a',
          color: '#fff'
        }}>
          <ContactForm />
        </div>
      )}
    </>
  );
}

export default Header;
