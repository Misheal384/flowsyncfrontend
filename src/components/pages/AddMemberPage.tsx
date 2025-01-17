import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addMember } from '../../services/api';

const AddMemberPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [memberName, setMemberName] = useState('');
  const [slackId, setSlackId] = useState('');

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addMember(teamId!, { name: memberName, slackId });
      console.log('Member added:', response.data);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div>
      <h1>Add Member to Team</h1>
      <form onSubmit={handleAddMember}>
        <label>
          Member Name:
          <input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)} required />
        </label>
        <label>
          Slack ID:
          <input type="text" value={slackId} onChange={(e) => setSlackId(e.target.value)} required />
        </label>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMemberPage;
