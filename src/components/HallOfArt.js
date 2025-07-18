import React from "react";
import "./HallOfArt.css";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3d41?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
];

export default function HallOfArt() {
  return (
    <section className="hallofart-section">
      <div className="hallofart-inner">
        <div className="hallofart-images">
          {images.map((src, i) => (
            <div className={`hallofart-frame frame-${i+1}`} key={i}>
              <img src={src} alt={`artwork ${i+1}`} />
              <span className="hallofart-caption">fig {i+1}</span>
            </div>
          ))}
        </div>
        <div className="hallofart-text">
          <h1 className="hallofart-title">HALL OF FRAMES</h1>
          <div className="hallofart-desc">
            <b>Frames I’ve used in my works</b>
            <br /><br />
            A selection of signature visual styles, each presented in a unique frame. Scroll or hover to explore the collection. Every piece is a study in composition, border, and presentation.
          </div>
        </div>
      </div>
    </section>
  );
}
