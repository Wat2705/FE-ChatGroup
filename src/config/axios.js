import axios from "axios";
const { VITE_BASE_URL } = import.meta.env

axios.defaults.baseURL = VITE_BASE_URL
axios.defaults.headers['Content-Type'] = 'application/json'