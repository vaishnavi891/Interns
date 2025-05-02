// src/services/Api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:6001';

export const getDashboardStats = async () => {
  const res = await axios.get(`${BASE_URL}/api/admin/dashboard-stats`);
  return res.data;
};

export const getAllInternships = async () => {
  const res = await axios.get(`${BASE_URL}/api/admin/internships`);
  return res.data;
};

export const updateInternshipStatus = async (id, status) => {
  const res = await axios.patch(`${BASE_URL}/api/admin/internships/${id}/status`, { status });
  return res.data;
};

export const registerUser = async (form) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, form);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return res.data;
};
