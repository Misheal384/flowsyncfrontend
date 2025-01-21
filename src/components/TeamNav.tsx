import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../TeamNav.css';

const TeamNavbar: React.FC = () => {
  const [standupName, setStandupName] = useState("");

  return (
    <div className="team-management">
      <h1>{standupName || "Enter Standup Name"}</h1>
      <textarea
        placeholder="Type the standup name here..."
        value={standupName}
        onChange={(e) => setStandupName(e.target.value)}
        rows={2}
        style={{ width: "100%", marginBottom: "1rem", fontSize: "16px", padding: "0.5rem" }}
      ></textarea>
      <h3>Create new standup</h3>
      <Link to='/configure-standup-questions' className="team-nav-item">
        <span className="icon">1</span> Questions
      </Link>
      <Link to='/add-team-member' className="team-nav-item">
        <span className="icon">2</span> Add members
      </Link>
      <Link to='/Reporting' className="team-nav-item">
        <span className="icon">3</span> Reporting
      </Link>
    </div>
  );
};

export default TeamNavbar;
