require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const { connectMongo } = require('./db');
const { initSocket } = require('./socket');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'https://nexcall-1425e.web.app', 'http://localhost:5000'],
  credentials: true
}));

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://nexcall-1425e.web.app', 'http://localhost:5000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

initSocket(io);

// Start app after DB connection
async function run() {
  try {
    await connectMongo();

    // Import collections after connection
    const { usersCollection, messagesCollection, scheduleCollection, paymentCollection } = require('./db');

    // Routes
    app.use('/auth', require('./routes/authRoutes'));
    app.use('/users', require('./routes/userRoutes')(usersCollection));
    app.use('/', require('./routes/messageRoutes')(messagesCollection));
    app.use('/schedule', require('./routes/scheduleRoutes')(scheduleCollection));
    app.use('/payments', require('./routes/paymentRoutes')(paymentCollection));
    app.use('/', require('./routes/tokenRoutes'));

    // Root route
    app.get('/', (req, res) => res.send("NEXCALL SERVER RUNNING"));

    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

run();