import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import TeamNav from '../TeamNav';
import "../styles/AddMemberPage.css";
import "../styles/Global.css";

interface Member {
  id: string;
  name: string;
}

const AddMemberPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [availableMembers, setAvailableMembers] = useState<Member[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [reminderDay, setReminderDay] = useState('');
  const [reminderTime, setReminderTime] = useState('participant');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available members from the backend
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/members`); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data: Member[] = await response.json();
        setAvailableMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []); // Empty dependency array ensures this runs only once

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Members to be added:', members);
    navigate('/teams'); // Simulate navigation after form submission
  };

  const handleAddToSelectedMembers = (member: Member) => {
    if (!members.find((m) => m.id === member.id)) {
      setMembers([...members, member]);
      setAvailableMembers(availableMembers.filter((m) => m.id !== member.id)); // Remove from dropdown
    }
  };

  const handleRemoveMember = (memberId: string) => {
    const removedMember = members.find((m) => m.id === memberId);
    if (removedMember) {
      setMembers(members.filter((m) => m.id !== memberId));
      setAvailableMembers([...availableMembers, removedMember]); // Add back to dropdown
    }
  };

  return (
    <div className="page-container add-member-page">
      <Navbar />
      <TeamNav />
      <h1>Add Participants to Team</h1>

      <form className="add-member-form" onSubmit={handleAddMember}>
        <label>
          Member Name:
          <input
            type="text"
            value={memberName}
            onFocus={() => setDropdownVisible(true)} // Show dropdown on focus
            onChange={(e) => setMemberName(e.target.value)}
            required
          />
        </label>

        {dropdownVisible && (
          <ul className="dropdown">
            {availableMembers
              .filter((member) =>
                member.name.toLowerCase().includes(memberName.toLowerCase())
              )
              .map((member) => (
                <li
                  key={member.id}
                  onClick={() => {
                    handleAddToSelectedMembers(member);
                    setDropdownVisible(false); // Hide dropdown on selection
                    setMemberName(''); // Clear input
                  }}
                >
                  {member.name}
                </li>
              ))}
          </ul>
        )}

        <h3>Selected Members</h3>
        <ul className="selected-members">
          {members.map((member) => (
            <li key={member.id} className="member-item">
              {member.name}
              <button
                type="button"
                className="close-button"
                onClick={() => handleRemoveMember(member.id)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>

        <div className="frequency-container">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>

          <label>
            Frequency:
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
        </div>

        <label>
          Reminder Day:
          <input
            type="text"
            placeholder="e.g., Monday, Wednesday"
            value={reminderDay}
            onChange={(e) => setReminderDay(e.target.value)}
          />
        </label>

        <label>
          Reminder Time:
          <select
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            required
          >
            <option value="participant">At participant's given time</option>
            <option value="given-time">At a specific time</option>
            <option value="random-after-start">Randomly after work start time</option>
            <option value="randomly">Randomly</option>
            <option value="given-interval">After a given time</option>
          </select>
        </label>

        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMemberPage;
