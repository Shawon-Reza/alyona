import { baseUrl } from "../config/config";
import axios from "axios";


// Create an instance of axios
const axiosApi = axios.create({
    baseURL: baseUrl,
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
            const userinfo = JSON.parse(localStorage.getItem("accessToken"));
            token = userinfo?.access;
            console.log('Using token:', token); // Debug log to check which token is being used

        } catch (error) {
            console.error("Error parsing token from localStorage", error);
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // If sending FormData, let the browser set the Content-Type (including boundary)
        // Some components create a FormData and expect the multipart boundary to be present.
        if (config.data && typeof FormData !== 'undefined' && config.data instanceof FormData) {
            try {
                // Remove any preset content-type so browser can set the correct multipart boundary
                if (config.headers && config.headers['Content-Type']) {
                    delete config.headers['Content-Type'];
                }
                if (config.headers && config.headers['content-type']) {
                    delete config.headers['content-type'];
                }
            } catch (e) {
                // noop
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosApi;
