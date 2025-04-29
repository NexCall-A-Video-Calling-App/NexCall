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
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY); /// add stripe key 

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
        const usersCollections = client.db("NexCall").collection('users');
        const messagesCollection = client.db("NexCall").collection('messages');
        const scheduleCollection = client.db("NexCall").collection("schedule");
        const paymentCollection = client.db("NexCall").collection("payments");

        // JWT AUTH ENDPOINTS
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                })
                .send({ success: 'cookie created' });
        });

        app.get('/jwt', async (req, res) => {
            res.send("jwt /jwt working");
        });

        app.post('/jwtlogout', async (req, res) => {
            res
                .clearCookie('token', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                })
                .send({ success: 'cookie cleared' });
        });

        app.get('/logout', async (req, res) => {
            res.send("jwt /logout working");
        });

        const verifyToken = (req, res, next) => {
            const token = req?.cookies?.token;
            if (!token) {
                return res.status(401).send({ message: 'Token not found to verify' });
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'Unauthorized Error' });
                }
                req.user = decoded;
                next();
            });
        };

        app.get('/messages/:roomId', async (req, res) => {
            const roomId = req.params.roomId;
            const messages = await messagesCollection.find({ room: roomId }).toArray();
            res.send(messages);
        });

        app.get("/conversations/user/:email", async (req, res) => {
            const { email } = req.params;
            const userRooms = await messagesCollection.aggregate([
                {
                    $match: {
                        $or: [
                            { senderEmail: email },
                            { receiverEmail: email }
                        ]
                    }
                },
                {
                    $group: {
                        _id: "$room"
                    }
                }
            ]).toArray();

            const roomIds = userRooms.map(r => r._id);
            const result = await messagesCollection.aggregate([
                {
                    $match: {
                        room: { $in: roomIds }
                    }
                },
                {
                    $group: {
                        _id: "$room",
                        messages: {
                            $push: {
                                message: "$message",
                                senderName: "$senderName",
                                receiverName: "$receiverName",
                                senderEmail: "$senderEmail",
                                receiverEmail: "$receiverEmail",
                                photo: "$photo",
                                timestamp: "$timestamp"
                            }
                        },
                        lastMessageTime: { $max: "$timestamp" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        room: "$_id",
                        messages: 1,
                        lastMessageTime: 1
                    }
                },
                {
                    $sort: {
                        lastMessageTime: -1
                    }
                }
            ]).toArray();

            res.json(result);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollections.insertOne(user);
            res.send(result);
        });

        app.get('/users', async (req, res) => {
            const results = await usersCollections.find().toArray();
            res.send(results);
        });

        app.post("/schedule-collections", async (req, res) => {
            try {
                const scheduleResult = req.body;
                const result = await scheduleCollection.insertOne(scheduleResult);
                res.send(result);
            } catch (error) {
                console.log(error.message);
                res.send({ message: "This error from Schedule api" });
            }
        });

        app.get('/schedule-collections/:email', async (req, res) => {
            try {
                const email = req.params.email;
                const result = await scheduleCollection.find({ email: email }).sort({ Date: 1,Time:1 }).toArray();
                res.send(result);
            } catch (err) {
                console.log(err);
                res.send({ message: "This message from schedule-collections get method" });
            }
        });


        // stripe
        
        app.post('/create-payment-intent', async (req,res)=>{
            // amount pass like {}
          
            console.log("called payment")

            try{
                const paymentIntent = await  stripe.paymentIntents.create({
                   amount : req.body.amount*100,
                    currency:req.body.currency || 'usd',
                    automatic_payment_methods:{
                        enabled:true
                    }

                })
                res.json({clientSecret:paymentIntent.client_secret})


            }catch(error){
                res.status(500).json({error:error.message});

            }
        })
        // create payment successed api 

        app.post('/payment-success', async(req,res)=>{

          

            try{
                const info = req.body;

                const result = await paymentCollection.insertOne(info);
          
                res.send(result);


            }catch(error)
            {
                res.status(404).send({message: error.message})
            }

        })
        // all payments
        
        app.get('/all-payments', async(req,res)=>{

          try{
            const result = await paymentCollection.find().toArray();
            res.send(result);
          }catch(error)
          {
            res.send({message:error.message})

          }
        })





    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

run();