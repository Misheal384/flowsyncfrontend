import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeams, deleteTeam, removeMember } from '../../services/api';
import Navbar from '../Navbar';
import '../styles/TeamsPage.css';

interface Team {
  id: string;
  name: string;
  standupQuestions: string[];
  members: { id: string; name: string }[];
}

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleDeleteTeam = async (teamId: string) => {
    try {
      await deleteTeam(teamId);
      setTeams(teams.filter((team) => team.id !== teamId));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const handleRemoveMember = async (teamId: string, memberId: string) => {
    try {
      await removeMember(teamId, memberId);
      setTeams(
        teams.map((team) =>
          team.id === teamId
            ? { ...team, members: team.members.filter((member) => member.id !== memberId) }
            : team
        )
      );
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  return (
    <div className="team-management">
      <Navbar />
      <h1>Team Management</h1>
      <p>
        Welcome to the Team Setup Page! Here, you can create and manage your teams effortlessly.
        <br />
        Add new teams with a name and description.
        <br />
        Manage team members by adding their details, including email and time zone.
        <br />
        Set custom schedules, configure standup questions, and define reminder times for each team.
        <br />
        Get started by creating your first team or selecting an existing one to edit!
      </p>
      <button onClick={() => navigate('/add-team')} className="create-team-btn">
        + Create Team
      </button>

      <h1>Teams</h1>
      <div className="teams-container">
        {teams.map((team) => (
          <div key={team.id} className="team-card">
            <h2>{team.name}</h2>
            <h4>Standup Questions:</h4>
            <ul>
              {team.standupQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
            <h4>Members:</h4>
            <ul>
              {team.members.map((member) => (
                <li key={member.id}>
                  {member.name}
                  <button
                    onClick={() => handleRemoveMember(team.id, member.id)}
                    className="remove-member-btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="dropdown">
              <button className="dropdown-btn">...</button>
              <div className="dropdown-content">
                <button onClick={() => handleDeleteTeam(team.id)}>Delete Team</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

//alternative code.
/* <h1>Teams</h1>
<div className="teams-container">
  {teams.map((team) => (
    <div key={team.id} className="team-card">
      <div className="team-card-header">
        <h2>{team.name}</h2>
        <div className="dropdown">
          <button className="dropdown-btn">...</button>
          <div className="dropdown-content">
            <button onClick={() => handleDeleteTeam(team.id)}>Delete Team</button>
          </div>
        </div>
      </div>
      <div className="team-card-body">
        <div className="standup-questions">
          <h4>Standup Questions:</h4>
          <ul>
            {team.standupQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
        <div className="team-members">
          <h4>Members:</h4>
          <ul>
            {team.members.map((member) => (
              <li key={member.id} className="member-item">
                {member.name}
                <button
                  onClick={() => handleRemoveMember(team.id, member.id)}
                  className="remove-member-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ))}
</div>
*/
  );
};

export default TeamsPage;
