// src/services/Api.js
import axios from 'axios';

// ✅ Changed: removed hardcoded localhost and used relative path
const BASE_URL = '/api/admin';

export const getDashboardStats = async () => {
  const res = await axios.get(`${BASE_URL}/dashboard-stats`);
  return res.data;
};

export const getAllInternships = async () => {
  const res = await axios.get(`${BASE_URL}/internships`);
  return res.data;
};

export const updateInternshipStatus = async (id, status) => {
  const res = await axios.patch(`${BASE_URL}/internships/${id}/status`, { status });
  return res.data;
};
