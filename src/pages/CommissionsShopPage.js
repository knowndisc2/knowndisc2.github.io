import React from "react";
import "./CommissionsShopPage.css";

export default function CommissionsShopPage() {
  return (
    <main className="commshop-main">
      <section className="commshop-hero">
        <h1 className="commshop-title">Commissions</h1>
        <p className="commshop-body">
          I am open for custom art commissions!<br/>
          <b>How it works:</b><br/>
          Describe your idea or project, and I’ll create a unique, editorial artwork tailored to you.<br/>
          <br/>
          <b>Contact me</b> for pricing, timelines, and to discuss your vision:
          <br/><br/>
          <a href="mailto:your@email.com" className="commshop-contact">your@email.com</a>
        </p>
      </section>
    </main>
  );
}
