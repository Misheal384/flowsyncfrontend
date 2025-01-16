import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Standup Bot App</h1>
      <p>Streamline your team's daily standups and reporting with ease.</p>
      <div className="home-links">
        <Link to="/teams" className="btn primary">Manage Teams</Link>
        <Link to="/teams/:teamId/members/:memberId/standup" className="btn primary">View Standups</Link>
        <Link to="/reports" className="btn primary">Generate Reports</Link>
      </div>
    </div>
  );
};

export default HomePage;