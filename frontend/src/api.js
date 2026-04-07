import axios from "axios";

// This URL will be replaced by the VITE_API_URL environment variable in production
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: API_URL,
});

export default api;