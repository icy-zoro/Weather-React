import axios from "axios";

const weatherCommon = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})

weatherCommon.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        appid: import.meta.env.VITE_API_KEY,
    }
    return config
})

export default weatherCommon
