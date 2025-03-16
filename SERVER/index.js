// explain the socket topics mentioned here.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const PORT = process.env.PORT || 5000;

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("user connected")
    console.log("Id", socket.id)


    io.on('disconnect',(reason)=>{
        
        console.log(`Disconnect user id ${socket.id} reason ${why}`)
    })

    
})

app.get('/', (req, res) => {
    res.send("CHAT SERVER RUNNING")
})

server.listen(5000, () => {
    console.log(`Server running using Socket.io on http://localhost:${PORT}`)
})