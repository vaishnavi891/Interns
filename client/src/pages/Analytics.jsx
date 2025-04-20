// Analytics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    const fetchInternshipData = async () => {
      try {
        const res = await axios.get('/api/admin/internships');
        const branchCounts = {};

        res.data.forEach((item) => {
          const branch = item.branch || 'Unknown';
          branchCounts[branch] = (branchCounts[branch] || 0) + 1;
        });

        const formattedData = Object.keys(branchCounts).map(branch => ({
          branch,
          internships: branchCounts[branch],
        }));

        setBranchData(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInternshipData();
  }, []);

  return (
    <div className="analytics-container">
      <h2>Internship Analytics (Branch-wise)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={branchData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="branch" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="internships" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
