import { useState } from 'react';
import { registerUser, loginUser } from '../services/api';
import './Register.css'; // Make sure this path is correct

export default function Register() {
  const [form, setForm] = useState({ rollNo: '', name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.rollNo || !form.name || !form.email || !form.password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError('');
    try {
      await registerUser(form);
      // After successful registration, create student record
      await fetch('http://localhost:6001/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo: form.rollNo, name: form.name, email: form.email }),
      });
      // Then login the user automatically
      const loginRes = await loginUser({ email: form.email, password: form.password });
      const { token, role, email } = loginRes;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('email', email);
      window.dispatchEvent(new Event('login'));
      setSubmitted(true);
      setForm({ rollNo: '', name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Student Registration</h2>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Registering...</div>}
        {submitted && <div className="success-message">Submitted successfully</div>}

        <input 
          name="rollNo" 
          placeholder="Roll No" 
          value={form.rollNo} 
          onChange={handleChange} 
          className="input-style" 
          disabled={loading}
        />
        <input 
          name="name" 
          placeholder="Name" 
          value={form.name} 
          onChange={handleChange} 
          className="input-style" 
          disabled={loading}
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          className="input-style" 
          disabled={loading}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          className="input-style" 
          disabled={loading}
        />
        <input 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirm Password" 
          value={form.confirmPassword} 
          onChange={handleChange} 
          className="input-style" 
          disabled={loading}
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
