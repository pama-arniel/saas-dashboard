import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  dataDataURL: "https://dummyjson.com",
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);

// Users
export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Keep existing for now
export const fetchOrders = async () => {
  const response = await api.get("/carts", {
    params: { limit: 10 },
  });

  return response.data.carts ?? [];
};
