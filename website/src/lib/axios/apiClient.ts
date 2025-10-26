import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

/**
 * Helper to set Authorization header for the apiClient.
 * Pass undefined to remove the header.
 */
export function setAuthToken(token?: string) {
    if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common.Authorization;
    }
}

// Add response interceptor to normalize errors if desired
apiClient.interceptors.response.use(
    (r) => r,
    (error) => {
        // pass through, caller will categorize
        return Promise.reject(error);
    }
);

