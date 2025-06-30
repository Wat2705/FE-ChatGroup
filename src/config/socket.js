import { io } from 'socket.io-client';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
const socket = io(VITE_BASE_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = (token) => {
  if (token && !socket.connected) {
    socket.io.opts.query = { token };
    socket.connect();
    console.log('Socket connecting with token:', token);
  } else if (!token && !socket.connected) {
    socket.connect();
    console.log('Socket connecting without token');
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log('Socket disconnected');
  }
};

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err.message);
});

export { socket };