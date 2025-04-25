// client/src/components/common/Analytics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const Analytics = () => {
  const [branchData, setBranchData] = useState([]);
  const [semesterData, setSemesterData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchAnalytics = async (status = 'all') => {
    try {
      const res = await axios.get('/api/admin/analytics?status=all');
      console.log('Analytics Data:', res.data); // Add this
      setBranchData(res.data.branchData);
      setSemesterData(res.data.semesterData);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    }
  };

  useEffect(() => {
    fetchAnalytics(statusFilter);
  }, [statusFilter]);

  return (
    <div className="analytics-container" style={{ padding: '1rem' }}>
      <h2>Internship Analytics</h2>
      <h3>Branch-wise Internships</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={branchData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="branch" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Semester-wise Internships</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={semesterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="semester" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default Analytics;
