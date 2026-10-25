import { Server } from 'socket.io'
import http from "http"
import express from 'express';
import { ENV } from './env.js';
import { socketAuthMiddleware } from '../middleware/socketAuthMiddleware.js';

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    } 

})

//APPLY AUTH  MIDDLEWARE TO ALL SOCKET CONNECTON
io.use(socketAuthMiddleware);

const userSocketMap = {}; 

io.on("connection", (socket) => {
    console.log("A user Connected", socket.user.fullName);
    const userId = socket.userId
    userSocketMap[userId] = socket.id

    // io.emit() is used to send event to all connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.user.fullName);
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
        
    })

})

export { io, app, server };