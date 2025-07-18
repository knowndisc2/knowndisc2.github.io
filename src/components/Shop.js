import React from "react";
import "./Shop.css";

const PRODUCTS = [
  {
    id: 1,
    title: "Dreamscape Print",
    price: 30,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca"
  },
  {
    id: 2,
    title: "Cyber Lain Poster",
    price: 40,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
  },
  {
    id: 3,
    title: "Vaporwave Canvas",
    price: 50,
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c"
  }
];

export default function Shop() {
  return (
    <section className="shop-section">
      <h2 className="shop-title">Shop Prints</h2>
      <div className="shop-grid">
        {PRODUCTS.map((p) => (
          <div className="shop-item" key={p.id}>
            <img src={p.image} alt={p.title} className="shop-img" />
            <h3>{p.title}</h3>
            <div className="shop-price">${p.price}</div>
            <button className="shop-btn">Buy</button>
          </div>
        ))}
      </div>
    </section>
  );
}
