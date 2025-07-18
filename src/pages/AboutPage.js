import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <main className="aboutme-main">
      <section className="aboutme-hero">
        <h1 className="aboutme-title">About Me</h1>
        <p className="aboutme-body">
          I am a visual artist focused on blending chaos and clarity. My journey explores the boundaries of digital art, editorial design, and experimental forms. This page is a deeper look at my process, influences, and philosophy.
        </p>
      </section>
      <section className="aboutme-details">
        <h2>My Process</h2>
        <p>I combine digital painting, generative art, and graphic design to create unique visual experiences. Each project is a new experiment in style and emotion.</p>
        <h2>Influences</h2>
        <p>Inspired by modernist art, brutalist web design, and the intersection of technology and aesthetics.</p>
      </section>
    </main>
  );
}
