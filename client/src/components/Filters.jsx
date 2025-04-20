import React from "react";
import "./Filters.css";

const Filters = () => {
  return (
    <div className="filters">
      <select>
        <option>Ongoing Internships</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>
    </div>
  );
};

export default Filters;