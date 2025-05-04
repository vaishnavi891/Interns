import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import './Login.css'; // Make sure to import the CSS file

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password.');
      return;
    }

    console.log('Logging in with credentials:', credentials);

    setLoading(true);
    setError('');
    try {
      const res = await loginUser(credentials);
      console.log('Login response:', res);
      const { token, role, email } = res;

      alert('Login successful');
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role); // 👈 Save the role
      localStorage.setItem('email', email); // 👈 Save the email

      window.dispatchEvent(new Event('login')); // optional

      // 👇 Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="form-title">Login</h2>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Logging in...</div>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="input-style"
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="input-style"
          disabled={loading}
        />
        <button className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
