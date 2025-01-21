import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboard, faChartBar, faClock } from '@fortawesome/free-solid-svg-icons';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Navbar />
      <h1>Welcome to the FlowSync Bot App</h1>
      <p>Streamline your team's daily standups and reporting with ease.</p>
      <div className="home-links">
        <Link to="/teams" className="card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="card-title">Manage Teams</div>
        </Link>
        
        <Link to='/set-reminder-times' className="card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="card-title">Set Reminders</div>
        </Link>
     
          
      </div>
    </div>
  );
};

export default HomePage;
