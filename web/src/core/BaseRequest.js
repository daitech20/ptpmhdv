import axios from "axios";
import authService from '../services/qltaphoa/auth.service';
import { authStore } from '../store/auth.store';
import { mapActions, mapState } from 'pinia';
import router from '../routes'
const apiUrl = 'http://192.168.1.15:8000/api/';

export default {
    ...mapActions(authStore, ['setAccessToken', 'clearAccessToken', 'clearRefreshToken', 'clearUser']),
    ...mapState(authStore, ['user', 'accessToken', 'refreshToken']),

    getHeaders() {
        if (this.user() === null) {
            return {}
        }

        return authService.checkExpriedToken(this.user().username)
        .then(response => {
            return { Authorization: 'Bearer ' + this.accessToken() }
        })
        .catch(error => {
            return authService.refreshToken(this.refreshToken())
            .then(response => {
                this.setAccessToken(response.data.access)
                return { Authorization: 'Bearer ' + response.data.access }
            })
            .catch(error => {
                this.clearAccessToken()
                this.clearRefreshToken()
                this.clearUser()
                router.push({ name: 'login'});
                return {}
            })
            
        })

    },

    async get(url) {
        const header = await this.getHeaders()
        return axios.get(
            apiUrl + url,
            { headers: header}
        );
    },

    async post(url, data) {
        const header = await this.getHeaders()
        return axios.post(
            apiUrl + url,
            data,
            { headers: header }
        );
    },

    async put(url, data) {
        const header = await this.getHeaders()
        return axios.put(
            apiUrl + url,
            data,
            { headers: header }
        );
    },

    async delete(url) {
        const header = await this.getHeaders()
        return axios.delete(
            apiUrl + url,
            { headers: header }
        );
    }
}