import axios from "axios"

// const token = window.localStorage.getItem("token")  

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true //recieving cookie
    // headers: {
    //     "Authorization": token? `Bearer ${token}` : null
    // } //works with local storage
})

export default api