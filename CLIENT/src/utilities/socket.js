import { io } from "socket.io-client";

// Replace with your backend URL if running on a server
const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
