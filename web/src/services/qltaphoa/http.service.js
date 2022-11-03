import axios from 'axios'
import { authStore } from '../../store/auth.store';

const http = axios.create({
    baseURL: 'http://192.168.1.15:8000/',
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