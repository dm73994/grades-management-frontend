import axios from "axios";

export const customAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:7399/api/v1',
    headers: {
        "Content-Type": "application/json",
    },
    responseType: "json",
    timeout: 5000,
});