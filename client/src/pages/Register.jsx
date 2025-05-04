import { useState } from 'react';
import { registerUser, loginUser } from '../services/api';
import './Register.css'; // Make sure this path is correct

export default function Register() {
  const [form, setForm] = useState({ rollNo: '', name: '', email: '', branch: '', semester: '', password: '', confirmPassword: '' });
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
    if (!form.rollNo || !form.name || !form.email || !form.branch || !form.semester || !form.password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError('');
    try {
      console.log('Registering user with form:', form);
      const registerRes = await registerUser(form);
      console.log('Register response:', registerRes);

      // After successful registration, create student record
      const studentRes = await fetch('http://localhost:6001/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNumber: form.rollNo, name: form.name, email: form.email, branch: form.branch, semester: form.semester }),
      });
      const studentData = await studentRes.json();
      console.log('Student creation response:', studentData);

      // Then login the user automatically
      const loginRes = await loginUser({ email: form.email, password: form.password });
      console.log('Login response:', loginRes);
      const { token, role, email } = loginRes;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('email', email);
      window.dispatchEvent(new Event('login'));
      setSubmitted(true);
      setForm({ rollNo: '', name: '', email: '', branch: '', semester: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error('Error during registration/login:', err);
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
          name="branch" 
          type="text" 
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange} 
          className="input-style" 
          disabled={loading}
        />

        <input 
          name="semester" 
          type="text" 
          placeholder="Semester" 
          value={form.semester} 
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
