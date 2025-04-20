import React from "react";
import "./InternshipTable.css";

const InternshipTable = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Organization</th>
            <th>Role</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>ABC Corp</td>
            <td>Developer</td>
            <td>2024-06-01</td>
            <td>2024-09-01</td>
            <td>Ongoing</td>
            <td><button className="action-btn">View</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InternshipTable;