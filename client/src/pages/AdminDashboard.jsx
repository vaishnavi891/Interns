// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { getDashboardStats, getAllInternships, updateInternshipStatus } from '../services/Api';
import DashboardStats from '../components/DashboardStats';
import Filters from '../components/Filters';
import InternshipTable from '../components/InternshipTable';
import './Pages.css'
const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [internships, setInternships] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStats = await getDashboardStats();
      setStats(fetchedStats);

      const fetchedInternships = await getAllInternships();
      setInternships(fetchedInternships);
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateInternshipStatus(id, status);
    setInternships((prevInternships) =>
      prevInternships.map((intern) =>
        intern._id === id ? { ...intern, status } : intern
      )
    );
  };

  const getFilteredInternships = () => {
    const now = new Date();
    return internships.filter((intern) => {
      const start = new Date(intern.startingDate);
      const end = new Date(intern.endingDate);
      if (filter === 'ongoing') return start <= now && end >= now;
      if (filter === 'past') return end < now;
      if (filter === 'future') return start > now;
      return true;
    });
  };

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      <DashboardStats stats={stats} />
      <Filters filter={filter} setFilter={setFilter} />
      <InternshipTable internships={getFilteredInternships()} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default AdminDashboard;
