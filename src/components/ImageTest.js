import React, { useEffect, useState } from 'react';

const ImageTest = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (!images || images.length === 0) return;

    const loadImage = (src, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ Image loaded: ${src}`);
          setLoadedImages(prev => ({
            ...prev,
            [index]: { src, status: 'loaded', error: null }
          }));
          resolve(true);
        };
        img.onerror = (e) => {
          console.error(`❌ Error loading image: ${src}`, e);
          setLoadedImages(prev => ({
            ...prev,
            [index]: { src, status: 'error', error: 'Failed to load' }
          }));
          resolve(false);
        };
        img.src = src;
      });
    };

    // Load all images
    const loadAllImages = async () => {
      console.log('Starting to load all images...');
      for (let i = 0; i < Math.min(images.length, 5); i++) {
        const img = images[i];
        if (img && img.src) {
          console.log(`Loading image ${i + 1}/${Math.min(images.length, 5)}:`, img.src);
          await loadImage(img.src, i);
        }
      }
      console.log('Finished loading test images');
    };

    loadAllImages();
  }, [images]);

  if (!images || images.length === 0) {
    return <div>No images to test</div>;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      zIndex: 1000,
      maxWidth: '300px',
      maxHeight: '300px',
      overflow: 'auto',
      fontSize: '12px'
    }}>
      <h4>Image Load Test</h4>
      <div>Testing first {Math.min(images.length, 5)} images:</div>
      {Array(Math.min(images.length, 5)).fill().map((_, i) => (
        <div key={i} style={{
          margin: '5px 0',
          padding: '5px',
          border: '1px solid #444',
          backgroundColor: loadedImages[i]?.status === 'loaded' ? 'rgba(0,255,0,0.1)' : 
                          loadedImages[i]?.status === 'error' ? 'rgba(255,0,0,0.1)' : 'rgba(255,255,0,0.1)'
        }}>
          <div>Image {i + 1}: {images[i]?.src.split('/').pop()}</div>
          <div>Status: {loadedImages[i]?.status || 'loading...'}</div>
          {loadedImages[i]?.error && (
            <div style={{ color: '#ff6b6b' }}>Error: {loadedImages[i].error}</div>
          )}
          {loadedImages[i]?.status === 'loaded' && (
            <div style={{ color: '#51cf66' }}>✓ Loaded successfully</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageTest;
