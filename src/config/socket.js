import { io } from "socket.io-client";

export let socket;

if (localStorage.getItem('token') != null) {
    socket = io('http://localhost:8080', {
        autoConnect: true,
        query: { token: localStorage.getItem('token') }
    })
}