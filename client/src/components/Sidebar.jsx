// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '←' : '☰'}
      </button>
      {isOpen && (
        <div className="sidebar">
          <h2>Admin Panel</h2>
          <nav>
            <ul>
              <li className={location.pathname === '/' ? 'active' : ''}><Link to="/">Dashboard</Link></li>
              <li className={location.pathname === '/students' ? 'active' : ''}><Link to="/students">Students</Link></li>
              <li className={location.pathname === '/internships' ? 'active' : ''}><Link to="/internships">Internships</Link></li>
              <li className={location.pathname === '/feedbacks' ? 'active' : ''}><Link to="/feedbacks">Feedbacks</Link></li>
              <li className={location.pathname === '/analytics' ? 'active' : ''}><Link to="/analytics">Analytics</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
