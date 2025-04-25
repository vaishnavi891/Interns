import React, { useEffect, useState } from "react";
import axios from "axios";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    branch: "",
    year: "",
    studyPhase: "" // this maps to semester
  });

  const fetchInternships = async () => {
    try {
      const query = Object.entries(filters)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => {
          if (key === "studyPhase") return `semester=${value}`;
          return `${key}=${value}`;
        })
        .join("&");

      const res = await axios.get(`http://localhost:5000/api/admin/internships/filter?${query}`);
      setInternships(res.data);
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    fetchInternships();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Internships</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <select className="form-select" name="type" onChange={handleChange} value={filters.type}>
            <option value="">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
            <option value="future">Upcoming</option>
          </select>
        </div>

        <div className="col-md-3">
          <select className="form-select" name="branch" onChange={handleChange} value={filters.branch}>
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
          </select>
        </div>

        <div className="col-md-3">
          <select className="form-select" name="studyPhase" onChange={handleChange} value={filters.studyPhase}>
            <option value="">Select Study Phase</option>
            <option value="2-1">Second Year - Sem 1</option>
            <option value="2-2">Second Year - Sem 2</option>
            <option value="3-1">Third Year - Sem 1</option>
            <option value="3-2">Third Year - Sem 2</option>
            <option value="4-1">Fourth Year - Sem 1</option>
            <option value="4-2">Fourth Year - Sem 2</option>
          </select>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" onClick={handleFilter}>Apply Filter</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Roll No</th>
              <th>Organization</th>
              <th>Role</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>Package</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship) => (
              <tr key={internship._id}>
                <td>{internship.rollNumber}</td>
                <td>{internship.organization}</td>
                <td>{internship.role}</td>
                <td>{new Date(internship.startingDate).toLocaleDateString()}</td>
                <td>{new Date(internship.endingDate).toLocaleDateString()}</td>
                <td>{internship.status}</td>
                <td>{internship.branch || "-"}</td>
                <td>{internship.semester || "-"}</td>
                <td>{internship.package || "-"}</td>
              </tr>
            ))}
            {internships.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-muted">No internships found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Internships;
