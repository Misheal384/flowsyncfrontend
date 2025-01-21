import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

interface Team {
    id: string;
    name: string;
}

interface Member {
    id: string;
    name: string;
}

const SetReminderTimes: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]); // Ensure teams starts as an array
    const [selectedTeam, setSelectedTeam] = useState('');
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [reminderTime, setReminderTime] = useState('');

    useEffect(() => {
        // Fetch teams
        axios.get('/api/teams')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setTeams(response.data);
                } else {
                    console.error('Unexpected data format for teams:', response.data);
                    setTeams([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching teams:', error);
                setTeams([]); // Fallback to empty array
            });
    }, []);

    useEffect(() => {
        if (selectedTeam) {
            // Fetch members of the selected team
            axios.get(`/api/teams/${selectedTeam}/members`)
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setMembers(response.data);
                    } else {
                        console.error('Unexpected data format for members:', response.data);
                        setMembers([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching members:', error);
                    setMembers([]); // Fallback to empty array
                });
        }
    }, [selectedTeam]);

    const handleSetReminder = () => {
        // Set reminder time for the selected member
        axios
            .post(`/api/members/${selectedMember}/reminders`, { time: reminderTime })
            .then((response) => {
                alert('Reminder time set successfully!');
                console.log(response);
            })
            .catch((error) => console.error('Error setting reminder time:', error));
    };

    return (
        <div>
            <Navbar />
            <h1>Set Reminder Times</h1>
            <div>
                <label>Select Team:</label>
                <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                    <option value="">Select a team</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Member:</label>
                <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    disabled={!selectedTeam}
                >
                    <option value="">Select a member</option>
                    {members.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Reminder Time:</label>
                <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    disabled={!selectedMember}
                />
            </div>
            <button onClick={handleSetReminder} disabled={!reminderTime}>
                Set Reminder
            </button>
        </div>
    );
};

export default SetReminderTimes;
