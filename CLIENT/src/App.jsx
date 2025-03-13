import React, { useEffect } from 'react';
import { io } from 'socket.io-client'
const App = () => {
  const socket = io("http://localhost:5000")
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ", socket.id)
    })
    socket.on("hey",(s)=>{
      console.log(s)
    })
  }, [])
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default App;