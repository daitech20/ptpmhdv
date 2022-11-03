import { defineStore } from 'pinia'

export const authStore = defineStore('store', {
    state() {
        return {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            user: JSON.parse(localStorage.getItem('userInfo'))
        }
    },

    getters: {

        isLoggedIn() {

            return !!this.accessToken;
        }
    },

    actions: {
        /**
         * Set access token
         * @param {string} token
         */
        setAccessToken(token) {
            localStorage.setItem('accessToken', this.accessToken = token);
        },

        /**
         * Set refresh token
         * @param {string} refresh
         */
         setRefreshToken(refresh) {
            localStorage.setItem('refreshToken', this.refreshToken = refresh);
        },

        /**
         * Set user information
         * @param {object} user
         */
        setUser(user) {
            localStorage.setItem('userInfo', JSON.stringify(this.user = user))
        },

        /**
         * Set access token
         * @param {string} token
         */
        clearAccessToken() {
            this.accessToken = null;
            localStorage.removeItem('accessToken');
        },

        /**
         * Set refresh token
         * @param {string} refresh
         */
        clearRefreshToken() {
            this.refreshToken = null;
            localStorage.removeItem('refreshToken');
        },

        /**
         * Set user information
         * @param {object} user
         */
        clearUser() {
            this.user = null
            localStorage.removeItem('userInfo')
        }
    }
})