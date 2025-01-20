import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { addMember } from '../../services/api';
import Navbar from '../Navbar';
import "../styles/AddMemberPage.css";

const AddMemberPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [memberName, setMemberName] = useState('');
  const [slackId, setSlackId] = useState('');
  const [email, setEmail] = useState(''); // New email state
  const navigate = useNavigate(); // Initialize navigate

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addMember(teamId!, { name: memberName, slackId, email }); // Pass email data
      console.log('Member added:', response.data);

      // Redirect to the teams page after successfully adding the member
      navigate('/teams'); // Adjust the route if needed
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Add Member to Team</h1>
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
            onChange={(e) => setEmail(e.target.value)} // Handle email input
            required
          />
        </label>

        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMemberPage;
