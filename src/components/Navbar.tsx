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
    <Link to='/standup-collection' className="nav-item">
      <span className="icon"><FontAwesomeIcon icon={faClipboardList} /></span> Standup Bot
    </Link>
    {/* <Link to="/reports" className="nav-item">
      <span className="icon"><FontAwesomeIcon icon={faChartBar} /></span> Reports/Analytics
    </Link> */}
    <Link to="/teams/:teamId/members/:memberId/standup" className="nav-item">
      <span className="icon"><FontAwesomeIcon icon={faChartBar} /></span> Standup Collection
    </Link>
  </nav>
);

export default Navbar;
