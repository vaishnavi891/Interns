import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'; // Make sure this CSS file exists

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const storedEmail = localStorage.getItem('email');
      setIsLoggedIn(!!token);
      setEmail(storedEmail);
    };

    checkAuth();

    window.addEventListener('login', checkAuth);
    window.addEventListener('logout', checkAuth);

    return () => {
      window.removeEventListener('login', checkAuth);
      window.removeEventListener('logout', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setEmail(null);
    window.dispatchEvent(new Event('logout'));
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-header">
          <img
            src="https://media.licdn.com/dms/image/v2/C560BAQFKt8O5GdaFjw/company-logo_200_200/company-logo_200_200/0/1680080095222/vnr_vignanajyothiinstituteofengineeringandtechnology_logo?e=2147483647&v=beta&t=nV3OFiSPyeDZdeZib-pHBlNwN-i1S73KwQljcRw3FvY"
            alt="VNRVJIET Logo"
            className="navbar-logo"
          />
          <h1 className="navbar-title">Interné</h1>
        </div>
        <div className="navbar-links">
          {!isLoggedIn && (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}

          {isLoggedIn && email === 'vaishnavi@gmail.com' && (
            <>
              <Link to="/">Admin Dashboard</Link>
              <Link to="/students">Students</Link>
              <Link to="/internships">Internships</Link>
              <Link to="/feedbacks">Feedbacks</Link>
              <Link to="/analytics">Analytics</Link>
            </>
          )}

          {isLoggedIn && email !== 'vaishnavi@gmail.com' && (
            <>
              <Link to="/">Home</Link>
              
            </>
          )}

          {/* Logout Button always visible */}
          <button
            onClick={handleLogout}
            className="logout-btn"
            disabled={!isLoggedIn}
            title={!isLoggedIn ? "You are not logged in" : "Logout"}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
