import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faClipboardList, faChartBar } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <Link to="/" className="nav-item">
      <span className="icon"><FontAwesomeIcon icon={faHome} /></span> Home
    </Link>
    <Link to="/teams" className="nav-item">
      <span className="icon"><FontAwesomeIcon icon={faUsers} /></span> Teams
    </Link>
    <Link to="/configure-standup-questions" className="nav-item">
      <span className="icon"><FontAwesomeIcon icon={faClipboardList} /></span> Standups
    </Link>
    <Link to="/reports" className="nav-item">
      <span className="icon"><FontAwesomeIcon icon={faChartBar} /></span> Reports
    </Link>
  </nav>
);

export default Navbar;
