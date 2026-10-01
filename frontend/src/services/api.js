import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchMedicineDetails = async (medicineName) => {
  const response = await axios.get(`${API_BASE_URL}/medicine/${medicineName}`);
  return response.data;
};

export const fetchHistory = async () => {
  const response = await axios.get(`${API_BASE_URL}/history/`);
  return response.data;
};

export const clearSearchHistory = async () => {
  const response = await axios.delete(`${API_BASE_URL}/history/`);
  return response.data;
};