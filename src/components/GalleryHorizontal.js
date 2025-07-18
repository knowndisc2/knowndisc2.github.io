import React, { useRef } from "react";
import "./GalleryHorizontal.css";

const IMAGES = [
  // Replace with your actual artwork URLs
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c"
];

export default function GalleryHorizontal() {
  const containerRef = useRef(null);

  // Optional: Drag-to-scroll for desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  const onMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
    containerRef.current.classList.add("active");
  };
  const onMouseLeave = () => {
    isDown = false;
    containerRef.current.classList.remove("active");
  };
  const onMouseUp = () => {
    isDown = false;
    containerRef.current.classList.remove("active");
  };
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll-fast
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="gallery-horizontal-section">
      <div
        className="gallery-horizontal-container"
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {IMAGES.map((url, i) => (
          <div className="gallery-horizontal-image-wrap" key={i}>
            <img src={url} alt={`artwork-${i}`} className="gallery-horizontal-image" />
          </div>
        ))}
        {/* Chaotic floating SVG/overlay elements */}
        <div className="gallery-chaos chaos1" />
        <div className="gallery-chaos chaos2" />
      </div>
    </section>
  );
}
