import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeamPage from './pages/TeamPage';
import AddMemberPage from './pages/AddMemberPage';
import HomePage from './pages/HomePage';
// import NotFoundPage from './pages/NotFoundPage';
import StandupPage from './pages/StandupPage'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/teams', element: <TeamPage /> },
  { path: '/teams/:teamId/members', element: <AddMemberPage /> },
  { path: '/teams/:teamId/members/:memberId/standup', element: <StandupPage /> },
//   { path: '*', element: <NotFoundPage /> },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
