import React, { useEffect, useRef, useState } from 'react';
import './ModernCarousel.css';

// Simple carousel with minimal dependencies
const ModernCarousel = ({ images = [], currentIndex = 0, onIndexChange = () => {} }) => {
  console.log('ModernCarousel render. Images count:', images.length, 'Current index:', currentIndex);
  
  // Log image URLs for debugging
  useEffect(() => {
    console.log('Images in carousel:', images.map(img => ({
      src: img.src,
      title: img.title,
      category: img.category
    })));
  }, [images]);
  const [isInitialized, setIsInitialized] = useState(false);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  // Animation timing constants
  const TIME_RUNNING = 3000;
  const TIME_AUTO_NEXT = 7000;

  // Handle slide transition
  const showSlider = (direction) => {
    console.log('showSlider called with direction:', direction);
    if (!carouselRef.current) {
      console.error('carouselRef is not set');
      return;
    }
    if (!isInitialized) {
      console.error('Carousel not initialized');
      return;
    }
    if (images.length <= 1) {
      console.log('Not enough images to slide');
      return;
    }
    
    const carousel = carouselRef.current;
    
    // Update active state before animation
    const carouselItems = carousel?.querySelectorAll('.item');
    if (carouselItems && carouselItems.length > 0) {
      carouselItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentIndex);
      });
    }
    
    const list = carousel?.querySelector('.list');
    const thumbnail = carousel?.querySelector('.thumbnail');
    
    if (!list || !thumbnail) {
      console.warn('Carousel elements not found');
      return;
    }
    
    const items = list.querySelectorAll('.item');
    const thumbnails = thumbnail.querySelectorAll('.item');
    
    if (items.length === 0 || thumbnails.length === 0) {
      console.warn('No carousel items found');
      return;
    }

    // Clear any ongoing animations
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    // Handle slide animation
    const handleTransition = () => {
      if (!carouselRef.current) return;
      
      if (direction === 'next') {
        const firstItem = items[0];
        const firstThumb = thumbnails[0];
        if (firstItem && list) list.appendChild(firstItem);
        if (firstThumb && thumbnail) thumbnail.appendChild(firstThumb);
        onIndexChange((currentIndex + 1) % Math.max(1, images.length));
      } else {
        const itemList = Array.from(items);
        const thumbList = Array.from(thumbnails);
        const lastItem = itemList[itemList.length - 1];
        const lastThumb = thumbList[thumbList.length - 1];
        if (lastItem && list) list.prepend(lastItem);
        if (lastThumb && thumbnail) thumbnail.prepend(lastThumb);
        onIndexChange((currentIndex - 1 + images.length) % Math.max(1, images.length));
      }
      
      carousel.classList.remove(direction === 'next' ? 'next' : 'prev');
    };

    // Add transition class
    carousel.classList.add(direction === 'next' ? 'next' : 'prev');
    
    // Start animation after a small delay
    animationRef.current = setTimeout(handleTransition, 50);
  };

  // Auto-play functionality
  useEffect(() => {
    console.log('Auto-play effect. isInitialized:', isInitialized, 'Images count:', images.length);
    if (!isInitialized || images.length <= 1) return;
    
    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlayRef.current = setTimeout(() => {
        showSlider('next');
      }, TIME_AUTO_NEXT);
    };
    
    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
    
    startAutoPlay();
    
    // Cleanup on unmount
    return () => {
      stopAutoPlay();
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isInitialized, images.length, currentIndex]);
  
  // Set initialized after first render and when images are loaded
  useEffect(() => {
    console.log('Initializing carousel with images:', images?.length);
    if (images && images.length > 0) {
      console.log('Setting carousel as initialized');
      setIsInitialized(true);
      
      // Set initial active item
      setTimeout(() => {
        if (carouselRef.current) {
          const items = carouselRef.current.querySelectorAll('.item');
          if (items && items.length > 0) {
            items.forEach((item, idx) => {
              item.classList.toggle('active', idx === currentIndex);
            });
          }
        }
      }, 100);
    } else {
      console.warn('No images provided to ModernCarousel');
      setIsInitialized(false);
    }
    
    return () => {
      setIsInitialized(false);
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [images]);
  
  // Handle manual navigation
  const goToNext = () => showSlider('next');
  const goToPrev = () => showSlider('prev');

  // Don't render until initialized
  if (!isInitialized) {
    console.log('ModernCarousel: Not initialized yet');
    return <div className="modern-carousel loading">Loading carousel...</div>;
  }
  
  // Handle empty state
  if (!images || images.length === 0) {
    console.warn('ModernCarousel: No images provided');
    return <div className="modern-carousel empty">No images to display</div>;
  }
  
  console.log('ModernCarousel: Rendering with', images.length, 'images');
  
  // Debug: Log the first image URL to verify it's correct
  if (images.length > 0) {
    console.log('First image URL:', images[0].src);
    console.log('First image data:', {
      src: images[0].src,
      title: images[0].title,
      category: images[0].category
    });
  }

  // Wrap the carousel in an error boundary
  try {
    return (
      <div className="modern-carousel">
        <div className="carousel" ref={carouselRef}>
        {images.length > 0 && (
          <>
            <div className="list">
              {images.map((img, index) => (
                <div 
                  className={`item ${index === currentIndex ? 'active' : ''}`} 
                  key={`slide-${index}`}
                  style={{
                    display: index === currentIndex ? 'flex' : 'none',
                    opacity: index === currentIndex ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt || img.title || `Artwork ${index + 1}`} 
                    loading="lazy"
                    onLoad={(e) => {
                      console.log(`Image loaded: ${img.src}`, e.target);
                      e.target.style.opacity = 1;
                    }}
                    onError={(e) => {
                      console.error(`Error loading image: ${img.src}`, e);
                      e.target.style.border = '2px solid red'; // Visual indicator of error
                    }}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '80vh',
                      width: 'auto',
                      height: 'auto',
                      display: 'block',
                      backgroundColor: '#f8f9fa',
                      transition: 'opacity 0.3s ease-in-out',
                      opacity: 0
                    }}
                  />
                  <div className="content">
                    <div className="author">{img.author || 'ARTIST'}</div>
                    <div className="title">{img.title || 'ART TITLE'}</div>
                    <div className="topic">{img.category || 'CATEGORY'}</div>
                    {img.description && (
                      <div className="des">{img.description}</div>
                    )}
                    <div className="buttons">
                      <button>SEE MORE</button>
                      <button>CONTACT</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="thumbnail">
              {images.map((img, index) => (
                <div 
                  className={`item ${index === currentIndex ? 'active' : ''}`} 
                  key={`thumb-${index}`}
                  onClick={() => {
                    // Optional: Implement click to navigate
                    const diff = index - currentIndex;
                    if (diff > 0) {
                      showSlider('next');
                    } else if (diff < 0) {
                      showSlider('prev');
                    }
                  }}
                >
                  <img 
                    src={img.thumb || img.src} 
                    alt={`Thumbnail ${index + 1}`} 
                    loading="lazy"
                    onLoad={(e) => console.log(`Thumbnail loaded: ${img.thumb || img.src}`, e.target)}
                    onError={(e) => {
                      console.error(`Error loading thumbnail: ${img.thumb || img.src}`, e);
                      e.target.style.border = '2px solid red'; // Visual indicator of error
                    }}
                    style={{
                      width: '100px',
                      height: '60px',
                      objectFit: 'cover',
                      backgroundColor: '#f0f0f0' // Light gray background while loading
                    }}
                  />
                  <div className="content">
                    <div className="title">{img.title || `Artwork ${index + 1}`}</div>
                    {img.category && (
                      <div className="description">{img.category}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {images.length > 1 && (
              <div className="arrows">
                <button id="prev" onClick={goToPrev} aria-label="Previous">❮</button>
                <button id="next" onClick={goToNext} aria-label="Next">❯</button>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering ModernCarousel:', error);
    return (
      <div className="modern-carousel error">
        <h3>Error displaying carousel</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }
};

export default ModernCarousel;
