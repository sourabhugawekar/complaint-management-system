import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints for complaints
export const complaintAPI = {
  // Get all complaints
  getAll: async () => {
    const response = await api.get('/complaints');
    return response.data;
  },

  // Get single complaint by ID
  getById: async (id) => {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
  },

  // Create new complaint
  create: async (complaintData) => {
    const response = await api.post('/complaints', complaintData);
    return response.data;
  },

  // Update complaint
  update: async (id, complaintData) => {
    const response = await api.put(`/complaints/${id}`, complaintData);
    return response.data;
  },

  // Update complaint status only
  updateStatus: async (id, status) => {
    const response = await api.patch(`/complaints/${id}/status`, { status });
    return response.data;
  },

  // Delete complaint
  delete: async (id) => {
    const response = await api.delete(`/complaints/${id}`);
    return response.data;
  },
};

export default api;
