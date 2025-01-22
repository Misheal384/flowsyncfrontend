import axios from 'axios';

// Set up base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createTeam = async (teamData: { name: string; description: string;  }) => {
  return api.post('/teams', teamData);
};

export const addMember = async (teamId: string, memberData: { name: string;reminderDay: string; frequency: string;
   startDate: string,reminderTime: string,  }) => {
  return api.post(`/teams/${teamId}/members`, memberData);
};

export const submitStandup = async (teamId: string, memberId: string, answers: { questionId: string; response: string }[]) => {
  return api.post(`/standups/teams/${teamId}/members/${memberId}/standup`, { answers });
};

export const getStandups = async (filters: { teamId?: string; memberId?: string; date?: string }) => {
  return api.get('/standups', { params: filters });
};

export const getTeamStandups = async (teamId: string) => {
  return api.get(`/standups/teams/${teamId}`);
};
 

export const getTeams = async () => {
  return await api.get('/api/teams/questions');
};

export const deleteTeam = async (teamId: string) => {
  return await api.delete(`/api/teams/${teamId}`);
};

export const removeMember = async ( teamId: string, memberId: string) => {
  return await api.delete(`/api/teams/${teamId}/members/${memberId}`);
};

//function to get all members
export const getMembers = async () => {
  return await api.get(`/api/members`);
};
