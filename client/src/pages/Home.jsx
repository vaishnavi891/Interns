import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="main-content">
        <h2 className="subtitle">Welcome to the UG/PG Internship Portal</h2>
        <div className="options-grid">

          {/* Downloads */}
          <div className="card">
            <h2>📄 Documents</h2>
            <div className="document-section">
              <a href="" download>Letter of Recommendation Template</a>
            </div>
            <div className="document-section">
              <a href="https://1drv.ms/w/c/2879c4145659eca3/ETHRdK_La15KigY-Go9GHy0BQu9tEzCa5KRZvMqh-UH6XQ?e=CIhyHU" download>No Objection Certificate (NOC)</a>
            </div>
          </div>

          {/* Application Form */}
          <div className="card">
            <h2>📝 Apply</h2>
            <button onClick={() => navigate('/application')}>Fill Application Form</button>
          </div>

          {/* Feedback Upload */}
          <div className="card">
            <h2>📤 Submit Feedback</h2>
            <button onClick={() => navigate('/upload')}>Upload Feedback Form</button>
          </div>

        </div>
      </div>
    </div>
  );
}
