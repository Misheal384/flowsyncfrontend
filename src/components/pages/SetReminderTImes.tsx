import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import '../styles/SetReminderTimes.css';

interface Team {
    id: string;
    name: string;
}

interface Member {
    id: string;
    name: string;
}

// Sample hardcoded data for teams and members
const mockTeams: Team[] = [
    { id: '1', name: 'Team Alpha' },
    { id: '2', name: 'Team Beta' },
    { id: '3', name: 'Team Gamma' },
];

const mockMembers: Member[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
    { id: '4', name: 'David' },
    { id: '5', name: 'Eve' },
];

const SetReminderTimes: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>(mockTeams);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [members, setMembers] = useState<Member[]>(mockMembers);
    const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
    const [reminderTime, setReminderTime] = useState('');

    const handleAddMember = (member: Member) => {
        if (!selectedMembers.some((m) => m.id === member.id)) {
            setSelectedMembers([...selectedMembers, member]);
        }
    };

    const handleRemoveMember = (memberId: string) => {
        setSelectedMembers(selectedMembers.filter((member) => member.id !== memberId));
    };

    const handleSetReminder = () => {
        const memberIds = selectedMembers.map((member) => member.id);

        axios
            .post('/api/reminders', { members: memberIds, time: reminderTime })
            .then(() => {
                alert('Reminder time set successfully!');
            })
            .catch((error) => console.error('Error setting reminder time:', error));
    };

    return (
        <div className="set-reminder-times">
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
                <label>Select Members:</label>
                <select
                    value=""
                    onChange={(e) => {
                        const member = members.find((m) => m.id === e.target.value);
                        if (member) handleAddMember(member);
                    }}
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
            <div className="selected-members">
                {selectedMembers.map((member) => (
                    <div key={member.id} className="selected-member">
                        <span>{member.name}</span>
                        <button onClick={() => handleRemoveMember(member.id)}>&times;</button>
                    </div>
                ))}
            </div>
            <div>
                <label>Reminder Time:</label>
                <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    disabled={selectedMembers.length === 0}
                />
            </div>
            <button
                className="reminder-button"
                onClick={handleSetReminder}
                disabled={!reminderTime || selectedMembers.length === 0}
            >
                Set Reminder
            </button>
        </div>
    );
};

export default SetReminderTimes;
