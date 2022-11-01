import React, {createContext, useState} from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpContext from './HttpContext'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // const login = (username, password) => {
    //     setIsLoading(true)
    //     axios.post(`${BASE_URL}/token/`, {
    //         username, password,
    //     }).then(res => {
    //         let userInfo = res.data
    //         setUserInfo(userInfo)
    //         setErrors({})
    //         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    //         setIsLoading(false)
    //         console.log(userInfo)
    //     }).catch(e => {
    //         console.log(e)
    //         setIsLoading(false)
    //         setErrors(e.response.data)
    //     });
    // }

    const login = (username, password) => {
        setIsLoading(true)
        HttpContext.post('/token/', {
            username: username,
            password: password
        }).then(res => {
            let userInfo = res.data
            setUserInfo(userInfo)
            setErrors({})
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            AsyncStorage.setItem('accessToken', userInfo.access)
            setIsLoading(false)
        }).catch(e => {
            setIsLoading(false)
            setErrors(e.response.data)
        })
    }

    const logout = () => {
        setIsLoading(true)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('accessToken')
        setUserInfo({})
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={{login, userInfo, isLoading, logout, errors}}>{children}</AuthContext.Provider>
    )
}