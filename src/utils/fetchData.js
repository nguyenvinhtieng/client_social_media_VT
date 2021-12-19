import axios from 'axios'
import { SERVER_URL, TOKEN_NAME } from '../credentials'
export const getMethod = async (url) => {
    let token = localStorage.getItem(TOKEN_NAME)
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.get(`${SERVER_URL}/${url}`)
    return res
}
export const postMethod = async (url, data) => {
    let token = localStorage.getItem(TOKEN_NAME)
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.post(`${SERVER_URL}/${url}`, data)
    return res;
}
export const postMethodWithoutAuthorization = async (url, data) => {
    let token = localStorage.getItem(TOKEN_NAME)
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.post(`${SERVER_URL}/${url}`, data)
    return res;
}
export const putMethod = async (url, data) => {
    let token = localStorage.getItem(TOKEN_NAME)
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.put(`${SERVER_URL}/${url}`, data)
    return res;
}
export const deleteMethod = async (url, data) => {
    let token = localStorage.getItem(TOKEN_NAME)
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.delete(`${SERVER_URL}/${url}`, data)
    return res;
}