import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => (
  <nav className="navbar">
    <Link to="/" className="nav-item">
      <span className="icon">🏠</span> Home
    </Link>
    <Link to="/teams" className="nav-item">
      <span className="icon">👥</span> Teams
    </Link>
    <Link to="/standups" className="nav-item">
      <span className="icon">📋</span> Standups
    </Link>
    <Link to="/reports" className="nav-item">
      <span className="icon">📊</span> Reports
    </Link>
  </nav>
);

export default Navbar;