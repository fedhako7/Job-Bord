import axios from "axios"

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5500"
    baseURL: process.env.BASE_URL
})

export default axiosInstance