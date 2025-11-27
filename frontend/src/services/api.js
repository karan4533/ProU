import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Add token to requests if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response);
    return response.data;
  },
  (error) => {
    console.error('❌ API Error:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response,
      request: error.request,
      config: error.config
    });
    
    // Handle network errors (no response)
    if (!error.response) {
      const message = error.message || 'Network Error - Please check if backend is running on http://localhost:4000';
      console.error('Network error - Backend might be down or CORS issue');
      return Promise.reject(new Error(message));
    }

    // Handle 401 (Unauthorized) - token expired or invalid
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    const message = error.response?.data?.error || error.response?.data?.details?.[0] || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export default API;

