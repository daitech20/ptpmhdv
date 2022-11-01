import axios from 'axios'
import { BASE_URL } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {

    async getHeaders() {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken === null) {
            return {}
        }
        else return { "Authorization": 'Bearer ' + accessToken }
    },
    
    async get(url) {
        const header = await this.getHeaders()

        return axios.get(
            BASE_URL + url,
            { headers: header}
        );
    },

    async post(url, data) {
        const header = await this.getHeaders()
        return axios.post(
            BASE_URL + url,
            data,
            { headers: header }
        );
    },

    async put(url, data) {
        const header = await this.getHeaders()
        return axios.put(
            BASE_URL + url,
            data,
            { headers: header }
        );
    },

    async delete(url) {
        const header = await this.getHeaders()
        return axios.delete(
            BASE_URL + url,
            { headers: header }
        );
    }
}

