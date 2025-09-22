import axios from "axios";

// Create an instance of axios
const axiosApi = axios.create({
    baseURL: "http://10.10.13.59:8005",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to include Bearer token automatically
axiosApi.interceptors.request.use(
    (config) => {
        let token = null;  // Declare token variable here

        try {
            // Get access token from localStorage
            token = JSON.parse(localStorage.getItem('token')) 
                || JSON.parse(localStorage.getItem('adtoken')) 
                || JSON.parse(localStorage.getItem('mtrtoken'));

            console.log('Using token:', token); // Debug log to check which token is being used

        } catch (error) {
            console.error("Error parsing token from localStorage", error);
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosApi;
