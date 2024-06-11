import { io } from "socket.io-client";
const { VITE_BASE_URL } = import.meta.env
export let socket;

if (localStorage.getItem('token') != null) {
    socket = io(VITE_BASE_URL, {
        autoConnect: true,
        query: { token: localStorage.getItem('token') }
    })
}