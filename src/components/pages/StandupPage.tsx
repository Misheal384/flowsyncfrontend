import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import '../styles/StandupPage.css';

interface Standup {
  id: number;
  team: string;
  date: string;
  member: string;
  status: 'completed' | 'pending';
}

const StandupPage: React.FC = () => {
  // Mock data
  const mockStandups: Standup[] = [
    { id: 1, team: 'Team Alpha', date: '2025-01-20', member: 'Alice', status: 'completed' },
    { id: 2, team: 'Team Beta', date: '2025-01-20', member: 'Bob', status: 'pending' },
    { id: 3, team: 'Team Alpha', date: '2025-01-21', member: 'Charlie', status: 'completed' },
    { id: 4, team: 'Team Gamma', date: '2025-01-22', member: 'David', status: 'pending' },
    { id: 5, team: 'Team Beta', date: '2025-01-22', member: 'Eve', status: 'completed' },
  ];

  const [standups, setStandups] = useState<Standup[]>([]);
  const [filteredStandups, setFilteredStandups] = useState<Standup[]>([]);
  const [searchOption, setSearchOption] = useState<'team' | 'member' | 'date' | ''>('');
  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState<'completed' | 'pending' | ''>('');

  useEffect(() => {
    // Use mock data for initial standups
    setStandups(mockStandups);
    setFilteredStandups(mockStandups);
  }, []);

  useEffect(() => {
    // Filter based on search option
    let filtered = standups;

    if (searchOption && searchValue) {
      filtered = filtered.filter((standup) => {
        if (searchOption === 'team') return standup.team.includes(searchValue);
        if (searchOption === 'member') return standup.member.includes(searchValue);
        if (searchOption === 'date') return standup.date === searchValue;
        return true;
      });
    }

    if (sort) {
      filtered = filtered.sort((a, b) => (a.status === sort ? -1 : 1));
    }

    setFilteredStandups(filtered);
  }, [searchOption, searchValue, sort, standups]);

  return (
    <div className="standup-page">
      <Navbar />
      <h1 className="page-title">Team Standups</h1>
      <p>
        The Team Standup Dashboard serves as a hub for managing and monitoring all team standups. 
        Users can search by team, member, or date and sort by status.
      </p>
      <form className="standup-filter-form">
        <div className="form-group">
          <label htmlFor="searchOption" className="form-label">
            Search By:
          </label>
          <select
            id="searchOption"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value as 'team' | 'member' | 'date' | '')}
            className="form-select"
          >
            <option value="">Select an option</option>
            <option value="team">Team</option>
            <option value="member">Member</option>
            <option value="date">Date</option>
          </select>
        </div>
        {searchOption && (
          <div className="form-group">
            <label htmlFor="searchValue" className="form-label">
              {searchOption === 'date' ? 'Select Date' : `Enter ${searchOption.charAt(0).toUpperCase() + searchOption.slice(1)}`}
            </label>
            <input
              id="searchValue"
              type={searchOption === 'date' ? 'date' : 'text'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="form-input"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="sort" className="form-label">
            Sort by Status:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as 'completed' | 'pending' | '')}
            className="form-select"
          >
            <option value="">None</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </form>
      <ul className="standup-list">
        {filteredStandups.map((standup) => (
          <li key={standup.id} className="standup-item">
            <span>{standup.team}</span> - <span>{standup.date}</span> -{' '}
            <span>{standup.member}</span> -{' '}
            <span className={`status ${standup.status}`}>{standup.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StandupPage;
