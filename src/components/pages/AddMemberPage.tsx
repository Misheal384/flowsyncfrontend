import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { addMember } from '../../services/api';
import Navbar from '../Navbar';
import TeamNav from '../TeamNav';
import "../styles/AddMemberPage.css";


const AddMemberPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [memberName, setMemberName] = useState('');
  const [slackId, setSlackId] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [reminderDay, setReminderDay] = useState('');
  const [reminderTime, setReminderTime] = useState('participant');

  const navigate = useNavigate();

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addMember(teamId!, {
        name: memberName,
        slackId,
        email,
        startDate,
        frequency,
        reminderDay,
        reminderTime,
      });
      console.log('Member added:', response.data);

      navigate('/teams');
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div className="page-container add-member-page">
    <div>
      <Navbar />
      <TeamNav />
      <h1>Add Member to Team</h1>
      <div className="page-container add-member-page">
  ...
</div>

      <form className="add-member-form" onSubmit={handleAddMember}>
        <label>
          Member Name:
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            required
          />
        </label>

        <label>
          Slack ID:
          <input
            type="text"
            value={slackId}
            onChange={(e) => setSlackId(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

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
    </div>
  );
};

export default AddMemberPage;