import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTeamPage from './components/pages/CreateTeam';
import ManageTeam from './components/pages/TeamPage';
import AddMemberPage from './components/pages/AddMemberPage';
import HomePage from './components/pages/HomePage';
import RemoveTeam from './components/pages/RemoveTeam';
import RemoveMember from './components/pages/RemoveMember';
import ConfigureStandup from './components/pages/ConfigureStandupQuestions';
// import SetUniqueTeamReminder from './components/pages/SetUniqueTeamSchedules';
import SetReminderTimes from './components/pages/SetReminderTimes';
import StandupPage from './components/pages/StandupPage';
import StandupCollection from './components/pages/StandupCollection';
import NotFoundPage from './components/pages/NotFoundPage';
import Reporting from './components/pages/Reporting';
import Reports from './components/pages/Reports';
import StandupDetailsPage from './components/pages/StandupDetailsPage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  //need to make huge adjustments
  { path: '/teams/', element: <ManageTeam /> },
  { path: '/add-team', element: <CreateTeamPage /> },
  { path: '/remove-team', element: <RemoveTeam /> },
  { path: '/add-team-member', element: <AddMemberPage/> },
  { path: '/remove-team-member', element: <RemoveMember /> },
  // { path: '/set-unique-team-schedules', element: <SetUniqueTeamReminder /> },
  { path: '/set-reminder-times', element: <SetReminderTimes /> },
  { path: '/configure-standup-questions', element: <ConfigureStandup /> },
  { path: '/standup-collection', element: <StandupCollection /> },
  
  {path: '/Reporting', element: <Reporting />},
  //need to make huge adjustments
  //changes within here to be done
  { path: '/create-team', element: <CreateTeamPage /> },
  { path: '/teams/:teamId/members', element: <AddMemberPage /> },
  { path: '/teams/:teamId/members/:memberId/standup', element: <StandupPage /> },
  { path: '/standup-collection/:id', element: <StandupDetailsPage /> }, // Add this route
  { path: '/reports', element: <Reports /> },
  { path: '*', element: <NotFoundPage /> },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
