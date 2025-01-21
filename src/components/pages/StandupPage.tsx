import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import '../styles/StandupPage.css'

interface Standup {
  id: number;
  team: string;
  date: string;
  member: string;
  status: 'completed' | 'pending';
}

const StandupPage: React.FC = () => {
  const [standups, setStandups] = useState<Standup[]>([]);
  const [filteredStandups, setFilteredStandups] = useState<Standup[]>([]);
  const [filter, setFilter] = useState({ team: '', date: '', member: '' });
  const [sort, setSort] = useState<'completed' | 'pending' | ''>('');

  useEffect(() => {
    const fetchStandups = async () => {
      const response = await fetch('/api/standups');
      const data = await response.json();
      setStandups(data);
      setFilteredStandups(data);
    };

    fetchStandups();
  }, []);

  useEffect(() => {
    let filtered = standups;

    if (filter.team) {
      filtered = filtered.filter((standup) => standup.team === filter.team);
    }

    if (filter.date) {
      filtered = filtered.filter((standup) => standup.date === filter.date);
    }

    if (filter.member) {
      filtered = filtered.filter((standup) => standup.member === filter.member);
    }

    if (sort) {
      filtered = filtered.sort((a, b) => (a.status === sort ? -1 : 1));
    }

    setFilteredStandups(filtered);
  }, [filter, sort, standups]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as 'completed' | 'pending' | '');
  };

  return (
    <div className="standup-page">
      <Navbar />
      <h1 className="page-title">Team Standups</h1>
      <p>The Team Standup Dashboard serves as a comprehensive hub for managing and monitoring all team standups in one place. 
        <p>With powerful filtering and sorting options, users can easily navigate standup data and gain valuable insights.</p>It offers intuitive features to enhance team collaboration and streamline daily workflows. 
       Additionally, the export functionality allows for seamless data sharing and reporting.</p>
      <form className="standup-filter-form">
        <div className="form-group">
          <label htmlFor="team" className="form-label">
            Team:
          </label>
          <input
            id="team"
            type="text"
            placeholder='search by team name...'
            name="team"
            value={filter.team}
            onChange={handleFilterChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="member" className="form-label">
            Member:
          </label>
          <input
            id="member"
            type="text"
            placeholder='search by member name....'
            name="member"
            value={filter.member}
            onChange={handleFilterChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sort" className="form-label">
            Sort by status:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={handleSortChange}
            className="form-select"
          >
            <option value="">None</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button type="submit" className="form-button">
          Apply Filters
        </button>
      </form>
      <ul className="standup-list">
        {filteredStandups.map((standup) => (
          <li key={standup.id} className="standup-item">
            <span>{standup.team}</span> - <span>{standup.date}</span> -{' '}
            <span>{standup.member}</span> -{' '}
            <span className={`status ${standup.status}`}>
              {standup.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StandupPage;
