
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import Students from './pages/Students';
import Internships from './pages/Internships';
import Feedbacks from './pages/Feedbacks';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import InternshipForm from './pages/InternshipForm';
import UploadCertificate from './pages/Upload';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    console.log('App useEffect: token:', token, 'email:', storedEmail);
    if (token && storedEmail) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
    } else {
      setIsLoggedIn(false);
      setEmail(null);
    }

    const handleAuthEvent = () => {
      const token = localStorage.getItem('token');
      const storedEmail = localStorage.getItem('email');
      console.log('App auth event: token:', token, 'email:', storedEmail);
      if (token && storedEmail) {
        setIsLoggedIn(true);
        setEmail(storedEmail);
      } else {
        setIsLoggedIn(false);
        setEmail(null);
      }
    };

    window.addEventListener('login', handleAuthEvent);
    window.addEventListener('logout', handleAuthEvent);
    return () => {
      window.removeEventListener('login', handleAuthEvent);
      window.removeEventListener('logout', handleAuthEvent);
    };
  }, []);

  if (!isLoggedIn) {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  if (email === 'vaishnavi@gmail.com') {
    // Admin routes
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="internships" element={<Internships />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  } else {
    // Student routes
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<InternshipForm />} />
          <Route path="/upload" element={<UploadCertificate />} />
          <Route path="/application" element={<InternshipForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }
};

export default App;

