import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);
  const locoScroll = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      locoScroll.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        smoothMobile: false,
        resetNativeScroll: true,
        lerp: 0.1,
      });
    }

    // Update Locomotive Scroll on route change
    const handleRouteChange = () => {
      if (locoScroll.current) {
        locoScroll.current.update();
      }
    };

    window.addEventListener('load', handleRouteChange);
    window.addEventListener('resize', handleRouteChange);

    return () => {
      if (locoScroll.current) {
        locoScroll.current.destroy();
      }
      window.removeEventListener('load', handleRouteChange);
      window.removeEventListener('resize', handleRouteChange);
    };
  }, []);

  return (
    <div 
      ref={scrollRef} 
      data-scroll-container
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}
