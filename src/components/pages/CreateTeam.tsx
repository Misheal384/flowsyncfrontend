import React, { useState } from 'react';
import { createTeam } from '../../services/api';

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
    <div>
      <h1>Create Team</h1>
      <form onSubmit={handleCreateTeam}>
        <label>
          Team Name:
          <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
        </label>
        <label>
          Timezone:
          <input type="text" value={timezone} onChange={(e) => setTimezone(e.target.value)} required />
        </label>
        <label>
          Schedule:
          <input type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} required />
        </label>
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default TeamPage;
