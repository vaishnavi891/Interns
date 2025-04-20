import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";

const Internships = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/internships");
        setInternships(res.data);
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };
    fetchInternships();
  }, []);

  return (
    <div className="page-container">
      <h2 className="section-title">All Internships</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Organization</th>
            <th>Role</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {internships.map((internship) => (
            <tr key={internship._id}>
              <td>{internship.rollNo}</td>
              <td>{internship.organization}</td>
              <td>{internship.role}</td>
              <td>{internship.startDate}</td>
              <td>{internship.endDate}</td>
              <td>{internship.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Internships;
