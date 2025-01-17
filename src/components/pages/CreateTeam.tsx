import React, { useState } from 'react';
import { createTeam } from '../../services/api';
import Navbar from '../Navbar';
import "../styles/CreateTeam.css";

const TeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [timezone, setTimezone] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createTeam({ name: teamName, timezone, schedule });
      console.log('Team created successfully:', response.data);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className="team-page">
      <Navbar />
      <h1>Create Team</h1>
      <form className="team-form" onSubmit={handleCreateTeam}>
        <label>
          Team Name:
          <input 
            type="text" 
            value={teamName} 
            onChange={(e) => setTeamName(e.target.value)} 
            required 
          />
        </label>
        
        <label>
          Timezone:
          <select 
            value={timezone} 
            onChange={(e) => setTimezone(e.target.value)} 
            required
          >
            <option value="">Select Timezone</option>
            <option value="UTC">UTC</option>
            <option value="GMT">GMT</option>
            <option value="EST">EST</option>
            <option value="PST">PST</option>
            <option value="CET">CET</option>
            <option value="IST">IST</option>
            {/* Add more timezones as necessary */}
          </select>
        </label>

        <label>
          Schedule:
          <select 
            value={schedule} 
            onChange={(e) => setSchedule(e.target.value)} 
            required
          >
            <option value="">Select Schedule</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Monthly">Monthly</option>
            {/* Add more schedule options as necessary */}
          </select>
        </label>
        
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default TeamPage;