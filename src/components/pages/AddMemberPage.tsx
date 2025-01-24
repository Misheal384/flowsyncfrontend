import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import TeamNav from '../TeamNav';
import "../styles/AddMemberPage.css";
import "../styles/Global.css";
import { getMembers } from '../../services/api';

interface Member {
  id: string;
  name: string;
}

const AddMemberPage: React.FC = () => {
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [availableMembers, setAvailableMembers] = useState<Member[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [reminderTime, setReminderTime] = useState('');
  
  

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available members from the backend
    const fetchMembers = async () => {
      try {
        const response = await getMembers();
        if (response.status !== 200) {
          throw new Error('Failed to fetch members');
        }
        const data: Member[] = await response.data.users;
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
           <div>
                <label>Reminder Time:</label>
                <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    
                />
            </div>
            <label>
          Reminder text:
          <input 
            type="text" 
            // value={teamName} 
            // onChange={(e) => setTeamName(e.target.value)} 
            required 
          />
        </label>
        </ul>

       

        <button type="submit">Add Participants</button>
      </form>
    </div>
  );
};

export default AddMemberPage;
