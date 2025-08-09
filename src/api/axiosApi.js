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
        // Get accesstoken from localstorage.........................
        const token = JSON.parse(localStorage.getItem('accessToken'));


        if (token) {
            config.headers.Authorization = `Bearer ${token.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosApi;
