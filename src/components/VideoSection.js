import React, { useState } from 'react';
import './VideoSection.css';
import VideoModal from './VideoModal';

const VideoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoId = '8ep07BaqcuI';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="video-section">
      <div className="video-thumbnail" onClick={openModal}>
        <div className="thumbnail-overlay">
          <div className="play-button">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="rgba(0,0,0,0.6)" />
              <polygon points="40,30 75,50 40,70" fill="white" />
            </svg>
          </div>
          <h3>WATCH VIDEO</h3>
        </div>
        <img 
          src={thumbnailUrl} 
          alt="Video Thumbnail" 
          className="thumbnail-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
      </div>
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        videoUrl={videoUrl} 
      />
    </section>
  );
};

export default VideoSection;
