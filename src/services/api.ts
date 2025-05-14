import axios from 'axios';
import toast from 'react-hot-toast';

// Create an axios instance with defaults
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle unauthorized errors (401)
    // if (response?.status === 401) {
    //   localStorage.removeItem('token');
    //   window.location.href = '/login';
    //   toast.error('Session expired. Please log in again.');
    // }
    
    // Handle server errors
    if (response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    // Handle validation errors
    if (response?.status === 422) {
      const errorMessage = response.data.message || 'Validation failed';
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default api;