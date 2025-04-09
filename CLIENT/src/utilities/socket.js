import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  reconnection: true,  
  reconnectionAttempts: Infinity,  
  reconnectionDelay: 1000,  
}); // For local server
// const socket = io("https://nexcall.up.railway.app"); // For live server (uncomment for production)

export default socket;