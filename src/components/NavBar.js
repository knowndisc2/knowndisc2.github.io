import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();
  return (
    <nav className="main-nav">
      <Logo />
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
        <Link to="/commissions" className={location.pathname === "/commissions" ? "active" : ""}>Commissions + Shop</Link>
      </div>
    </nav>
  );
}
