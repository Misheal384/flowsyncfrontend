import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTeam, removeMember } from '../../services/api';
import Navbar from '../Navbar';
import '../styles/TeamPage.css';
//remember to replace getTeams and useEffect for the useEffect function
interface Team {
  id: string;
  name: string;
  standupQuestions: string[];
  members: { id: string; name: string }[];
}
//example hardccoded data for team
const hardcoded_teams = [
  { id: '1',
    name: 'Team 1',
    standupQuestions: ['What did you do yesterday?', 'What will you do today?', 'Do you have any blockers?'],
    members: [
      { id: '1',
        name: 'Alice'
      },
      { id: '2',
        name: 'Bob'
      },
      { id: '3',
        name: 'Charlie'
      }, ]
      ,
    },
    { id: '2',
      name: 'Team 2',
      standupQuestions: ['What did you work on yesterday?', 'What are you working on today?', 'Do you have any blockers?'],
      members: [
        { id: '4',
          name: 'David'
        },
        { id: '5',
          name: 'Eve'
        },
        { id: '6',
          name: 'Frank'
        },
      ],
    },
  ];
const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(hardcoded_teams);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     try {
  //       const response = await getTeams();
  //       if (Array.isArray(response.data)) {
  //         setTeams(response.data);
  //       } else {
  //         console.error("Unexpected API response format", response.data);
  //         setTeams([]); // Fallback to an empty array
  //       }
  //     } catch (error) {
  //       console.error('Error fetching teams:', error);
  //       setTeams([]); // Fallback to an empty array on error
  //     }
  //   };
  //   fetchTeams();
  // }, []);
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
    <div>
      <div className="team-management-header-container">
        <Navbar />
        <div className="team-management-header">
          <h1>Team Management</h1>
          <p>
            Welcome to the Team Setup Page! Here, you can create and manage your teams effortlessly.
            
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
        </div>
      </div>
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
  );
};
export default TeamsPage;






