// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/Api';
import DashboardStats from '../components/DashboardStats';
import './Pages.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalInternships: 0,
    totalFeedbacks: 0,
    pendingInternships: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchedStats = await getDashboardStats();
        setStats(fetchedStats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <DashboardStats stats={stats} />
    </div>
  );
};

export default AdminDashboard;
