// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/api';
import DashboardStats from '../components/DashboardStats';
import UserList from '../components/UserList';
import './Pages.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalInternships: 0,
    totalFeedbacks: 0,
    pendingInternships: 0,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchedStats = await getDashboardStats();
        setStats(fetchedStats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchStats();
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <DashboardStats stats={stats} />
      <UserList users={users} />
    </div>
  );
};

export default AdminDashboard;
