import { Server } from 'socket.io';
import http from "http";
import express from 'express';
import { ENV } from './env.js';
import { socketAuthMiddleware } from '../middleware/socketAuthMiddleware.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    } 
});

// APPLY AUTH MIDDLEWARE TO ALL SOCKET CONNECTIONS
io.use(socketAuthMiddleware);

const userSocketMap = {}; // { [userId]: Set<string> }

// Returns an array of active socket IDs for the user
export function getReciverScoketId(userId) {
    return userSocketMap[userId] ? Array.from(userSocketMap[userId]) : [];
}

io.on("connection", (socket) => {
    console.log("A user Connected", socket.user.fullName);
    const userId = socket.userId;

    if (!userSocketMap[userId]) {
        userSocketMap[userId] = new Set();
    }
    userSocketMap[userId].add(socket.id);

    // io.emit() is used to send event to all connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.user.fullName);
        if (userSocketMap[userId]) {
            userSocketMap[userId].delete(socket.id);
            if (userSocketMap[userId].size === 0) {
                delete userSocketMap[userId];
            }
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { io, app, server };
