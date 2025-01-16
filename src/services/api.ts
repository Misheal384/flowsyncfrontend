import axios from 'axios';

// Set up base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const createTeam = async (teamData: { name: string; timezone: string; schedule: string }) => {
  return api.post('/teams', teamData);
};

export const addMember = async (teamId: string, memberData: { name: string; slackId: string }) => {
  return api.post(`/teams/${teamId}/members`, memberData);
};

export const submitStandup = async (teamId: string, memberId: string, answers: any[]) => {
  return api.post(`/standups/teams/${teamId}/members/${memberId}/standup`, { answers });
};

export const getStandups = async (filters: { teamId?: string; memberId?: string; date?: string }) => {
  return api.get('/standups', { params: filters });
};

export const getTeamStandups = async (teamId: string) => {
  return api.get(`/standups/teams/${teamId}`);
};
