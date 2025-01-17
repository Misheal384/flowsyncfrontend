import React from 'react';
import Navbar from '../Navbar';
import '../styles/Reports.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Reports: React.FC = () => {
  // Placeholder data for the bar chart
  const barChartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Standups Submitted',
        data: [12, 15, 8, 18, 20, 14, 19],
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Standups Missed',
        data: [3, 2, 5, 1, 0, 4, 2],
        backgroundColor: '#F44336',
      },
    ],
  };

  // Placeholder data for the line chart
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Submission Trend',
        data: [50, 60, 45, 70],
        borderColor: '#007BFF',
        fill: false,
      },
    ],
  };

  return (
    <div className="reports-page">
      <Navbar />
      <h1 className="page-title">Team Reports</h1>

      {/* Placeholder cards */}
      <div className="report-cards">
        <div className="card">
          <h2>Team Alpha</h2>
          <p>Total Members: 10</p>
        </div>
        <div className="card">
          <h2>Standups Submitted</h2>
          <p>134</p>
        </div>
        <div className="card">
          <h2>Standups Missed</h2>
          <p>26</p>
        </div>
      </div>

      {/* Placeholder charts */}
      <div className="charts">
        <div className="chart-container">
          <h3>Standup Submission History</h3>
          <Bar data={barChartData} />
        </div>
        <div className="chart-container">
          <h3>Submission Trend</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
