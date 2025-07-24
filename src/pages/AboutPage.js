import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <main className="aboutme-main">
      <section className="aboutme-hero">
        <h1 className="aboutme-title">About Me</h1>
        <p className="aboutme-body">
          I've been drawing for 2 years. I draw mainly anime characters for some reason. drawing is a love and hate hobby.
        </p>
      </section>
      <section className="aboutme-details">
        <h2>My Process</h2>
        <p>I sketch, I render, then I do filters. Over and over again. Either that, or I sketch, lineart, and then I do filters over all of that.</p>
        <h2>Influences</h2>
        <p>Inspired by ROLUA, SEOK_98, and much more.</p>
      </section>
    </main>
  );
}
