import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TeamPage.css'
import Navbar from '../Navbar';

const TeamPage: React.FC = () => {
    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    };

    return (
        <div className='manager'>
            <Navbar />
            <h1>Team Management</h1>
            <p>Welcome to the Team Setup Page!

Here, you can create and manage your teams effortlessly.<br></br>

Add new teams with a name and description.
<p>Manage team members by adding their details, including email and time zone.</p>
Set custom schedules, configure standup questions, and define reminder times for each team.
<br></br>Get started by creating your first team or selecting an existing one to edit!</p>
            
            {/* <ul> */}
                {/* <li> */}
                    <button onClick={() => navigateTo('/add-team')}>+ Ceate Team</button>
                {/* </li> */}
                {/* <li>
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
                </li> */}
               
            {/* </ul> */}
        </div>
    );
};

export default TeamPage;