import React, { useRef } from "react";
import "./ShowcaseSection.css";

// Replace with your own five images
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80"
];

export default function ShowcaseSection() {
  const scrollRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Mouse events for drag-to-scroll
  const onMouseDown = (e) => {
    isDownRef.current = true;
    scrollRef.current.classList.add("active");
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };
  const onMouseLeave = () => {
    isDownRef.current = false;
    scrollRef.current.classList.remove("active");
  };
  const onMouseUp = () => {
    isDownRef.current = false;
    scrollRef.current.classList.remove("active");
  };
  const onMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2; // drag speed
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  // Touch events for drag-to-scroll
  const onTouchStart = (e) => {
    isDownRef.current = true;
    startXRef.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };
  const onTouchEnd = () => {
    isDownRef.current = false;
  };
  const onTouchMove = (e) => {
    if (!isDownRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section className="showcase-gallery-section">
      <a className="showcase-gallery-topleft" href="#" aria-label="Playground Z15">
        Playground Z15
        <span className="showcase-gallery-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
            <path d="M9 13L4 8H14L9 13Z" fill="#222"/>
          </svg>
        </span>
      </a>
      <div className="showcase-gallery-topright">
        We dare to be different: to experiment, innovate, bring things into being, and spark emotions in the hearts of people interacting with us. We proudly stand with our heads up in the midst of today’s reality that is oversaturated with templated solutions, and we invite you to join us in creating something truly unique.
      </div>
      <div className="showcase-gallery-bignum">715</div>
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
        {images.map((img, idx) => (
          <div className="showcase-gallery-item" key={idx}>
            <img
              src={img.src}
              alt={`Gallery ${idx + 1}`}
              className="showcase-gallery-image"
              draggable="false"
            />
            {img.caption}
          </div>
        ))}
      </div>
    </section>
  );
}
