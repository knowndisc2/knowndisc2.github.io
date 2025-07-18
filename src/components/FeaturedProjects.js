import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./FeaturedProjects.css";

const projects = [
  {
    title: "Chaos & Order",
    subtitle: "Editorial Art Series",
    description:
      "A visual exploration of balance between digital chaos and minimalist order. Layered compositions, bold typography, and experimental layouts.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    year: "2024"
  },
  {
    title: "Fragments of Light",
    subtitle: "Generative Print Collection",
    description:
      "Prints inspired by fractured light and color. Each piece is unique, blending algorithmic randomness with editorial design.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    year: "2025"
  }
];

export default function FeaturedProjects() {
  // Parallax effect using Framer Motion
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const y2 = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section className="featured-section">
      <h2 className="featured-title">Featured Projects</h2>
      <div className="featured-grid">
        {projects.map((proj, idx) => (
          <motion.div
            className={`featured-card card-${idx}`}
            key={proj.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.4, 2, 0.6, 1] }}
            style={{ y: idx === 0 ? y1 : y2 }}
          >
            <div className="featured-img-wrap">
              <img src={proj.image} alt={proj.title} className="featured-img" />
              <span className="featured-year">{proj.year}</span>
            </div>
            <div className="featured-info">
              <h3 className="featured-proj-title">{proj.title}</h3>
              <div className="featured-subtitle">{proj.subtitle}</div>
              <div className="featured-desc">{proj.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
