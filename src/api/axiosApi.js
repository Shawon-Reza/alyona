// src/api/axiosApi.js
import axios from "axios";
const axiosApi = axios.create({
    baseURL: "http://10.10.13.59:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include Bearer token automatically
axiosApi.interceptors.request.use(
    (config) => {
        let token = null;  // Declare the token variable here

        try {
            // Get access token from localStorage
            token = JSON.parse(localStorage.getItem('token')) || JSON.parse(localStorage.getItem('adtoken'));
        } catch (error) {
            console.error("Error parsing token from localStorage", error);
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosApi;
