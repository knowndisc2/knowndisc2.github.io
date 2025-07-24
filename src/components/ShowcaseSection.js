import React, { useRef, useState, useEffect } from "react";
import "./ShowcaseSection.css";

// Video data with captions and years
const videoFiles = [
  {
    src: "/assets/dailydrawingvids/3371170128223832344.mp4",
    caption: "Daily Drawing #1",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3372552845523002571.mp4",
    caption: "Daily Drawing #2",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3385004268758086453.mp4",
    caption: "Daily Drawing #3",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3392170492418927276.mp4",
    caption: "Daily Drawing #4",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3403015513120687691.mp4",
    caption: "Daily Drawing #5",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3417543049678462764.mp4",
    caption: "Daily Drawing #6",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3426248279840614405.mp4",
    caption: "Daily Drawing #7",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3447705300402837325.mp4",
    caption: "Daily Drawing #8",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3455187146652128186.mp4",
    caption: "Daily Drawing #9",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3467577364013369837.mp4",
    caption: "Daily Drawing #10",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3472582954418497366.mp4",
    caption: "Daily Drawing #11",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3477660625179690036.mp4",
    caption: "Daily Drawing #12",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3498728778001133357.mp4",
    caption: "Daily Drawing #13",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3524077152875137195.mp4",
    caption: "Daily Drawing #14",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3545118898929066111.mp4",
    caption: "Daily Drawing #15",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3577023728412860223.mp4",
    caption: "Daily Drawing #16",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3667295870631377480.mp4",
    caption: "Daily Drawing #17",
    year: "2024"
  },
  {
    src: "/assets/dailydrawingvids/3672280980878761150.mp4",
    caption: "Daily Drawing #18",
    year: "2024"
  }
];

const VideoItem = ({ src, caption, year, isVisible }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        video.pause();
      } else if (isVisible && !isPlaying) {
        // Auto-play when visible if not already playing
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Auto-play prevented:', error);
          });
        }
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible, isPlaying]);

  return (
    <div className="showcase-gallery-item">
      <div className="showcase-gallery-redbg" aria-hidden="true"></div>
      <video
        ref={videoRef}
        className="showcase-gallery-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onClick={(e) => {
          e.preventDefault();
          const video = e.currentTarget;
          video.paused ? video.play() : video.pause();
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="showcase-gallery-caption-wrap">
        <span className="showcase-gallery-caption accent">{caption}</span>
        <span className="showcase-gallery-caption year"> — {year}</span>
      </div>
    </div>
  );
};

export default function ShowcaseSection() {
  const scrollRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [visibleIndex, setVisibleIndex] = useState(0);

  // Handle scroll events for visibility detection
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollPosition = scrollContainer.scrollLeft + (scrollContainer.offsetWidth / 2);
      const items = Array.from(scrollContainer.querySelectorAll('.showcase-gallery-item'));
      
      items.forEach((item, index) => {
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        
        if (scrollPosition >= itemLeft && scrollPosition < itemLeft + itemWidth) {
          setVisibleIndex(index);
        }
      });
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mouse events for drag-to-scroll
  const onMouseDown = (e) => {
    isDownRef.current = true;
    startXRef.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
    
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing';
      scrollRef.current.style.userSelect = 'none';
    }
    
    e.preventDefault();
  };

  const onMouseLeave = () => {
    isDownRef.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const onMouseUp = () => {
    isDownRef.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const onMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startXRef.current) * 1.5;
    
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  // Touch events for drag-to-scroll
  const onTouchStart = (e) => {
    isDownRef.current = true;
    startXRef.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const onTouchEnd = () => {
    isDownRef.current = false;
  };

  const onTouchMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startXRef.current) * 1.5;
    
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  return (
    <section className="showcase-gallery-section" style={{ backgroundColor: '#ffffff' }}>
      <div className="showcase-gallery-toplevel">
        <div className="showcase-gallery-topleft">
          <h2 className="zajno-heading">Instagram Drawing Everyday</h2>
          <p className="zajno-subheading">Daily Drawing Series</p>
        </div>
        <div className="showcase-gallery-topright">
          <p>I drew everyday because I wanted to get better at art. I thought my art was bad. I wanted to make it good.</p>
        </div>
      </div>
      
      <div 
        className="showcase-gallery-scroll"
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        {videoFiles.map((video, idx) => (
          <VideoItem 
            key={idx}
            src={video.src}
            caption={video.caption}
            year={video.year}
            isVisible={idx === visibleIndex}
          />
        ))}
      </div>
      
      <div className="showcase-gallery-bignum">
        137 DAYS
      </div>
      
      <div className="showcase-gallery-scrollhint">
        <span>← Scroll to explore →</span>
      </div>
    </section>
  );
}
