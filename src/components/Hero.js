import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";
import Logo from "./Logo";

export default function Hero() {
  // Parallax effect for background image
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="hero-section">
      <motion.div
        className="hero-parallax-bg"
        style={{ y }}
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1465101178521-c1a9136a3d41?auto=format&fit=crop&w=1200&q=80"
          alt="Editorial Abstract"
          className="hero-parallax-img"
        />
      </motion.div>
      <div className="hero-content">
        <Logo />
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1, ease: [0.4, 2, 0.6, 1] }}
        >
          Chaos & Clarity
        </motion.h1>
        <motion.div
          className="hero-tagline"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.4, 2, 0.6, 1] }}
        >
          Editorial Art Portfolio
        </motion.div>
      </div>
    </section>
  );
}
