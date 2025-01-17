import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TeamPage.css'

const TeamPage: React.FC = () => {
    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    };

    return (
        <div className='manager'>
            <h1>Team Management</h1>
            <button id='home-btn' onClick={() => navigateTo('/')}>Home</button>
            <ul>
                <li>
                    <button onClick={() => navigateTo('/add-team')}>Add Team</button>
                </li>
                <li>
                    <button onClick={() => navigateTo('/remove-team')}>Remove Team</button>
                </li>
                <li>
                    <button onClick={() => navigateTo('/add-team-member')}>Add Team Member</button>
                </li>
                <li>
                    <button onClick={() => navigateTo('/remove-team-member')}>Remove Team Member</button>
                </li>
                <li>
                    <button onClick={() => navigateTo('/set-unique-team-schedules')}>Set Unique Team Schedules</button>
                </li>
                <li>
                    <button onClick={() => navigateTo('/set-reminder-times')}>Set Reminder Times</button>
                </li>
                <li>
                    <button onClick={() => navigateTo('/configure-standup-questions')}>Configure Standup Questions</button>
                </li>
            </ul>
        </div>
    );
};

export default TeamPage;