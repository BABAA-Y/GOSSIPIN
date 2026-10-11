import express from 'express'
import dotenv from 'dotenv'
import path from "path"

import authRoutes from "./routes/authroute.js"
import messageRoutes from "./routes/messageroute.js"
import { connectDB } from './lib/db.js'

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(express.json()) // req.body

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// make redy for deployment 
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    setupPrimary.get("*", (_, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.listen(PORT, ()=>{
    console.log("server is running at port: " + PORT);
    connectDB();
})