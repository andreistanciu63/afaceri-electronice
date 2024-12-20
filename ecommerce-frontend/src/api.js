import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend-ul tău va fi aici
})

export default api
