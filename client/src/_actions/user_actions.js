import axios from "axios"
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT
} from './types'


export async function loginUser (dataTosubmit) {
    let user = await axios.post('/api/login',dataTosubmit);
    user = user.data
    return {
        type : LOGIN_USER,
        payload: user
    }
}

export async function registerUser (dataTosubmit) {
    let result = await axios.post('/api/register',dataTosubmit);
    result = result.data
    
    return {
        type : REGISTER_USER,
        payload : result
    }
    
}
export function auth () {
    const request = axios.get('/api/auth').then(res => res.data)
    return {
        type : AUTH_USER,
        payload: request
    }
        
}

export function logout() {
    const req = axios.get('/api/logout').then(res => {
        return res.data
    })
    return {
        type: LOGOUT,
        payload : req
    }
}
