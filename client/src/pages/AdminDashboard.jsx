// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { getDashboardStats, getAllInternships } from '../services/api';
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
  const [internships, setInternships] = useState([]);

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

    const fetchInternships = async () => {
      try {
        const data = await getAllInternships();
        setInternships(data);
      } catch (error) {
        console.error("Failed to fetch internships:", error);
      }
    };

    fetchStats();
    fetchUsers();
    fetchInternships();

    const intervalId = setInterval(() => {
      fetchInternships();
    }, 10000); // refresh every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <DashboardStats stats={stats} />
      <UserList users={users} />
      <h2 className="mt-5">Internship Submissions</h2>
      <ul>
        {internships.map((internship) => (
          <li key={internship._id}>
            {internship.studentName || internship.rollNumber} - Status: {internship.status || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
