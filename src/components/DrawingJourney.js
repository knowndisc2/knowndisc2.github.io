import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './DrawingJourney.css';

const DrawingJourney = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    // Start with visible state to prevent black screen
    controls.start('visible');
    
    const handleIntersect = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // Ensure content stays visible when scrolling back up
        controls.start('visible');
      }
    };

    // Set up intersection observer with more lenient thresholds
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.01,
      rootMargin: '0px 0px -50px 0px' // Reduced negative margin for earlier trigger
    });
    
    // Observe immediately without delay
    observer.observe(currentRef);
    
    return () => {
      observer.unobserve(currentRef);
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="drawing-journey"
      data-scroll-section
    >
      <motion.div 
        className="container"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        style={{
          padding: '0 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ 
          width: '100%',
          marginBottom: '3rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <motion.h2
            variants={itemVariants}
            data-scroll
            data-scroll-speed="1"
            style={{
              fontSize: '3rem',
              fontFamily: '"Canopee", serif',
              fontWeight: 'normal',
              color: '#fff',
              margin: 0,
              padding: 0,
              position: 'relative',
              display: 'inline-block',
              textAlign: 'center'
            }}
          >
            <span style={{
              display: 'inline-block',
              paddingBottom: '10px',
              borderBottom: '2px solid #fff',
              lineHeight: '1.2'
            }}>
              My Drawing Journey
            </span>
          </motion.h2>
        </div>
        
        <motion.div 
          className="journey-content"
          variants={itemVariants}
          data-scroll
          data-scroll-speed="0.8"
        >
          <motion.p 
            variants={itemVariants}
            data-scroll
            data-scroll-speed="0.9"
          >
            I started drawing digitally in July 2022 using a Deco V2 tablet, jumping in without any traditional art background—just a sudden urge to create.
          </motion.p>
          <motion.p 
            variants={itemVariants}
            data-scroll
            data-scroll-speed="0.8"
          >
           After spending months absorbing techniques from artists like TPPO, Rolua, and Yoneyama Mai, I challenged myself with 100 days of daily drawing to improve anatomy, backgrounds, and perspective. Now, I’m drawing for fun again, experimenting freely, and feeling proud of how far I’ve come in just two years.
          </motion.p>
        </motion.div>
      </motion.div>
      
      {/* Parallax Background */}
      <div 
        className="parallax"
        data-scroll
        data-scroll-speed="-1"
        data-scroll-target=".drawing-journey"
      >
        <div className="parallax-bg" />
      </div>
      
      {/* Floating Elements */}
      <motion.div 
        className="floating-orb orb-1"
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="floating-orb orb-2"
        animate={{
          y: [15, 0, 15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        data-scroll
        data-scroll-speed="0.5"
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.div>
    </section>
  );
};

export default DrawingJourney;
