import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTeam, removeMember, getTeams, getMembers } from '../../services/api';
import Navbar from '../Navbar';
import '../styles/TeamPage.css';

interface Team {
  id: string;
  name: string;
  slackChannelId: string;
  standupQuestions: string[];
  members: { id: string; name: string }[];
}

interface Member {
  id: string;
  name: string;
}

interface ApiResponse {
  users: { id: string; name: string }[];
}

function transformResponseToMembers(response: ApiResponse): Member[] {
  return response.users.map((user) => ({
    id: user.id,
    name: user.name,
  }));
}

function transformApiResponse(apiResponse: { team: { _id: string; name: string; slackChannelId: string; members: string[] }; questions: { text: string }[] }[]): Team[] {
  return apiResponse.map((item) => ({
    id: item.team._id,
    name: item.team.name,
    slackChannelId: item.team.slackChannelId,
    standupQuestions: item.questions.map((q) => q.text),
    members: item.team.members.map((memberId: string, index: number) => ({
      id: (index + 1).toString(),
      name: memberId,
    })),
  }));
}

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamsAndMembers = async () => {
      try {
        // Fetch teams
        const teamResponse = await getTeams();
        let transformedTeams: Team[] = [];
        if (Array.isArray(teamResponse.data)) {
          transformedTeams = transformApiResponse(teamResponse.data);
        } else {
          console.error("Unexpected API response format for teams", teamResponse.data);
        }
  
        // Fetch members
        const memberResponse = await getMembers();
        let members: Member[] = [];
        if (Array.isArray(memberResponse.data?.users)) {
          members = transformResponseToMembers(memberResponse.data);
        } else {
          console.error("Unexpected API response format for members", memberResponse.data);
        }
  
        // Combine teams and members
        const updatedTeams = transformedTeams.map((team) => ({
          ...team,
          members: team.members.map((member) => ({
            ...member,
            name: members.find((user) => user.id === member.name)?.name || member.name,
          })),
        }));
  
        setTeams(updatedTeams);
      } catch (error) {
        console.error('Error fetching teams or members:', error);
        setTeams([]); // Fallback to an empty array on error
      }
    };
  
    fetchTeamsAndMembers();
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
            <div className='team-card-top'>
              <h2>{team.name}</h2>
              
                <div className="dropdown">
                  <button className="dropdown-btn">...</button>
                  <div className="dropdown-content">
                    <button onClick={() => handleDeleteTeam(team.id)}>Delete Team</button>
                  </div>
                </div>
            </div>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
