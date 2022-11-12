import axios from 'axios'
import { authStore } from '../../store/auth.store';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

http.interceptors.request.use((config) => {
    const token = authStore().accessToken;
    if (token) {
        config.headers["Authorization"] = 'Bearer ' + token
    }

    return config
}, (err) => {
    return Promise.reject(err)
});

export default http;