import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DrawingJourney from '../components/DrawingJourney';
import VideoSection from '../components/VideoSection';
import ShowcaseSection from '../components/ShowcaseSection';

function Portfolio() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const ScrollReveal = ({ children, threshold = 0.1, delay = 0, immediate = false }) => {
    if (immediate) {
      return <div>{children}</div>;
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: threshold }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="portfolio-page">
      <main id="main-container" style={{ paddingTop: '100px' }}>
        <ScrollReveal immediate={true}>
          <DrawingJourney />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <VideoSection />
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <ShowcaseSection id="showcase" />
        </ScrollReveal>
        

      </main>
    </div>
  );
}

export default Portfolio;
