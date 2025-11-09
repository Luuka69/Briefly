// File: src/services/api.ts

import axios from 'axios';

// Create an axios instance with the base URL for our backend
const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api', // Your backend API base URL
});

// We can add an interceptor to automatically add the JWT token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;