import axios from "axios"



const baseUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: baseUrl
})




export const apiUrl = {
    register: {
        url: "/api/v1/user/register",
        method: "post"
    },
    login: {
        url: "/api/v1/user/login",
        method: "post"
    }
}