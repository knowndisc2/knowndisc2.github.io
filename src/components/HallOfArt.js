import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HallOfArt.css';

// Intersection Observer options
const observerOptions = {
  root: null,
  rootMargin: '100px',
  threshold: 0.1
};

// Image data
const imageData = [
  {
    id: 1,
    title: 'Wonderroom 2.0',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/113.png`,
    year: '2023'
  },
  {
    id: 2,
    title: 'Summerland Fun',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/115.jpg`,
    year: '2023'
  },
  {
    id: 3,
    title: 'Chaos and Dreams',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/117.jpg`,
    year: '2023'
  },
  {
    id: 4,
    title: 'Berserk Cigarette Dreams',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/120.jpg`,
    year: '2023'
  },
  {
    id: 5,
    title: 'Baseball Heat',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/132.png`,
    year: '2023'
  },
  {
    id: 6,
    title: 'Internet Escapism',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/146.png`,
    year: '2023'
  },
  {
    id: 7,
    title: 'DanDanDan Trauma',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/147.jpg`,
    year: '2023'
  },
  {
    id: 8,
    title: 'Ocean Blue',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/150.png`,
    year: '2023'
  },
  {
    id: 9,
    title: 'Fall Days',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/154.png`,
    year: '2023'
  },
  {
    id: 10,
    title: 'Hikikomori',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/155.png`,
    year: '2023'
  },
  {
    id: 11,
    title: 'Teashop and Summer',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/157.png`,
    year: '2023'
  },
  {
    id: 12,
    title: 'Catgirl',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/159.png`,
    year: '2023'
  },
  {
    id: 13,
    title: 'Windows XP Style',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/162.png`,
    year: '2023'
  },
  {
    id: 14,
    title: 'Rei Ayanami Escape',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/176.JPG`,
    year: '2023'
  },
  {
    id: 15,
    title: 'Yoru And Denji Forest',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/177.PNG`,
    year: '2023'
  },
  {
    id: 16,
    title: 'Yoru Bathroom',
    src: `${process.env.PUBLIC_URL}/assets/HallOfArt/180.PNG`,
    year: '2023'
  }
];

const HallOfArt = () => {
  const [visibleItems, setVisibleItems] = useState({});
  const galleryRef = useRef(null);
  const observerRef = useRef(null);

  // Handle intersection observer callback
  const handleIntersection = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const itemId = entry.target.dataset.id;
        setVisibleItems(prev => ({
          ...prev,
          [itemId]: true
        }));
        
        // Unobserve after it becomes visible
        if (observerRef.current) {
          observerRef.current.unobserve(entry.target);
        }
      }
    });
  }, []);

  // Initialize intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all gallery items
    const items = document.querySelectorAll('.gallery-item');
    if (items.length > 0) {
      items.forEach(item => {
        if (item) {
          observerRef.current.observe(item);
        }
      });
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  // Handle image click to open in new tab
  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hall-of-art" className="gallery">
      <div className="gallery-container">
        <h2 className="gallery-title">Hall of Art</h2>
        
        <div className="gallery-grid" ref={galleryRef}>
          {imageData.map((image, index) => {
            const isVisible = visibleItems[image.id] || false;
            const delay = (index % 6) * 0.1; // Staggered animation delay
            
            return (
              <div 
                key={image.id}
                data-id={image.id}
                className={`gallery-item ${isVisible ? 'visible' : ''}`}
                style={{
                  animationDelay: `${delay}s`,
                  cursor: 'pointer'
                }}
                onClick={() => handleImageClick(image.src)}
                aria-label={`View ${image.title}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleImageClick(image.src);
                  }
                }}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="gallery-image"
                  loading="lazy"
                  width={300}
                  height={300}
                />
                <div className="gallery-item-info">
                  <h3 className="gallery-item-title">{image.title}</h3>
                  <p className="gallery-item-year">{image.year}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HallOfArt;
