import axios from "axios"

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5500"
    baseURL: import.meta.env.VITE_BASE_URL,

})

export default axiosInstance