// ✅ src/components/DashboardStats.js
import React from "react";
import "./DashboardStats.css";

const DashboardStats = () => {
  const stats = [
    { label: "Total Students", value: 0 },
    { label: "Total Internships", value: 0 },
    { label: "Total Feedbacks", value: 0 },
    { label: "Pending Internships", value: 0 },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <div key={index} className="stat-card">
          <h3>{item.label}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;