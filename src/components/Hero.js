import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { scrollTo } from '../App';
import { gsap } from 'gsap';
import './Hero.css';

// Register GSAP plugins
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false
});

export default function Hero() {
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });
  const headerRef = useRef(null);
  const titleRow1Ref = useRef(null);
  const titleRow2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const copyrightRef = useRef(null);
  const scrollToRef = useRef(null);
  // Removed unused refs

  useEffect(() => {
    // Only run animations in the browser
    if (typeof window === 'undefined') return;
    
    const animate = () => {
      // Only proceed if all required refs are available
      if (!titleRow1Ref.current || !titleRow2Ref.current) return;
      
      // Set initial styles
      const elementsToAnimate = [
        ...(headerRef.current ? [headerRef.current] : []),
        ...Array.from(titleRow1Ref.current?.children || []),
        ...Array.from(titleRow2Ref.current?.children || []),
        subtitleRef.current,
        copyrightRef.current,
        scrollToRef.current
      ].filter(Boolean);
      
      gsap.set(elementsToAnimate, { opacity: 0, y: 20 });
      
      // Create master timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 },
        onComplete: () => {
          // Add any completion logic here
        }
      });
      
      // Header animation
      if (headerRef.current) {
        tl.fromTo(headerRef.current, 
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          0
        );
      }
      
      // Title row 1 animation
      if (titleRow1Ref.current?.children) {
        tl.fromTo(
          titleRow1Ref.current.children,
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            stagger: 0.03,
            ease: 'power3.out'
          },
          0.2
        );
      }
      
      // Title row 2 animation
      if (titleRow2Ref.current?.children) {
        tl.fromTo(
          titleRow2Ref.current.children,
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            stagger: 0.03,
            ease: 'power3.out'
          },
          0.4
        );
      }
      
      // Subtitle animation
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 0.8, duration: 1 },
          1
        );
      }
      
      // Copyright animation
      if (copyrightRef.current) {
        tl.fromTo(
          copyrightRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 0.7, duration: 0.8 },
          1.2
        );
      }
      
      // Scroll indicator animation
      if (scrollToRef.current) {
        tl.fromTo(
          scrollToRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          1.2
        );
      }
      
      // Removed unused prints button animations
    };
    
    // Try to animate immediately, then set up a retry mechanism
    animate();
    
    // If elements aren't ready, set up a retry
    const checkAndAnimate = setInterval(() => {
      if (titleRow1Ref.current && titleRow2Ref.current) {
        animate();
        clearInterval(checkAndAnimate);
      }
    }, 100);
    
    return () => clearInterval(checkAndAnimate);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Removed unused hover effect

  // Initialize animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section 
      ref={heroRef}
      className="hero"
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        color: '#ffffff',
        overflow: 'hidden',
        padding: '2rem',
        zIndex: 1
      }}
    >
      <header 
        ref={headerRef}
        className="header"
      >
        <div className="logo-wrap">
          <motion.h1 
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            KNOWNDISC
          </motion.h1>
        </div>
      </header>

      <div className="hero-content">
        <motion.div 
          className="hero-text-container"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1 
            variants={itemVariants}
            className="hero-title"
          >
            KNOWNDISC
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            className="hero-subtitle"
          >
            Digital Artist & Illustrator
          </motion.p>
        </motion.div>
        
        <div className="hero-grid">
          <div className="title-block">
            <h1 className="title-h1">
              <div className="title-row" ref={titleRow1Ref}>
                <span className="title-char">I</span>
                <span className="title-char">A</span>
                <span className="title-char">M</span>
                <span className="title-char">D</span>
                <span className="title-char">R</span>
                <span className="title-char">A</span>
                <span className="title-char">W</span>
                <span className="title-char">I</span>
                <span className="title-char">N</span>
                <span className="title-char">G</span>
              </div>
              <div className="title-row" ref={titleRow2Ref}>
                <span className="title-char">R</span>
                <span className="title-char">I</span>
                <span className="title-char">G</span>
                <span className="title-char">H</span>
                <span className="title-char">T</span>
                <span className="title-char">N</span>
                <span className="title-char">O</span>
                <span className="title-char">W</span>
              </div>
            </h1>
            <p className="subtitle" ref={subtitleRef}>
              <span>I AM ART BEGINNER</span>
              <br />
              <span className="drawing-text">Drawing for 2 years</span>
            </p>
          </div>
        </div>
        <div className="hero-footer">
          <div className="copyright" ref={copyrightRef}>
            &copy; {new Date().getFullYear()} KNOWNDISC
          </div>
          <div className="scroll-indicator" ref={scrollToRef}>
            SCROLL TO FIND OUT MORE
          </div>
        </div>
      </div>
    </section>
  );
}
