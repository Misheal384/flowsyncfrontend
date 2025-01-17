import React, { useState, useEffect } from 'react';

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
    // Fetch standups from an API or database
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
      filtered = filtered.filter(standup => standup.team === filter.team);
    }

    if (filter.date) {
      filtered = filtered.filter(standup => standup.date === filter.date);
    }

    if (filter.member) {
      filtered = filtered.filter(standup => standup.member === filter.member);
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
    <div>
      <h1>Team Standups</h1>
      <div className='tabs'>
          <button className='export'>Export Standup data</button>
      </div>
      <div>
        <label>
          Team:
          <input type="text" name="team" value={filter.team} onChange={handleFilterChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={filter.date} onChange={handleFilterChange} />
        </label>
        <label>
          Member:
          <input type="text" name="member" value={filter.member} onChange={handleFilterChange} />
        </label>
        <label>
          Sort by status:
          <select value={sort} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>
      </div>
      <ul>
        {filteredStandups.map(standup => (
          <li key={standup.id}>
            {standup.team} - {standup.date} - {standup.member} - {standup.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StandupPage;