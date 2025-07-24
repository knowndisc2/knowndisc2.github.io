import React, { useEffect, useRef } from 'react';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow the DOM to update before starting the animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for the fade-out animation to complete before closing
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`video-modal-overlay ${isVisible ? 'visible' : ''}`} 
      onClick={handleClose}
      ref={modalRef}
    >
      <div className="video-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>&times;</button>
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src={`${videoUrl}?autoplay=1`}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
