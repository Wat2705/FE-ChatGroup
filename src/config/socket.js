import { io } from "socket.io-client";

export let socket;

socket = io('http://localhost:8080', {
    autoConnect: true,
})