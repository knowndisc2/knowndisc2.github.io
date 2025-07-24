import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './pages/Portfolio';
import AboutPage from './pages/AboutPage';
import CommissionsShopPage from './pages/CommissionsShopPage';
import Footer from './components/Footer';

// Smooth scroll to anchor links
export const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const LeftBorder = () => {
  const textRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (textRef.current && !isMobile) {
      const text = 'BAD THINGS COME TO THOSE WHO WAIT ';
      textRef.current.textContent = text.repeat(20);
    }
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="left-border">
      <div ref={textRef} className="scrolling-text"></div>
    </div>
  );
};

const ScrollReveal = ({ children, threshold = 0.1, delay = 0, ...props }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, threshold]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.6, 
            ease: 'easeInOut',
            delay: delay
          } 
        },
        hidden: { 
          opacity: 0, 
          y: 20 
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

function Home() {
  return (
    <main id="main-container">
      <Hero />
      <ScrollReveal>
        <About id="about" />
      </ScrollReveal>
    </main>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href === '#' || href === '#!') return;

      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [location]);

  return (
    <div className="app-container" style={{ minHeight: '100vh', overflow: 'visible' }}>
      <LeftBorder />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/commissions" element={<CommissionsShopPage />} />
          <Route path="/contact" element={<div style={{ flex: 1 }} />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Add smooth scrolling behavior with a standard easing function
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Clean up
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
