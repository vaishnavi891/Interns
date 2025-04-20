// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  }
};

export const getAllInternships = async () => {
  try {
    const response = await axios.get(`${API_URL}/internships`);
    return response.data;
  } catch (error) {
    console.error('Error fetching internships:', error);
  }
};

export const updateInternshipStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/internships/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating internship status:', error);
  }
};
