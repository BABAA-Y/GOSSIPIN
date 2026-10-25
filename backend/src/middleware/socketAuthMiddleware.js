import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection required: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    // verify the token

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("socket Connection rejected: Invalid token");
      return next(new Error("Unauthrized - Invalid Token "));
    }

    // find the user formDB

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      console.log("socket Connection rejected: User not Found");
      return next(new Error("User not found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString()

    console.log(`socket authenticated for user: ${user.fullName} (${user._id})`);
    
    next()
  } catch (error) {
          console.log("Error in socket Authentication: ", error.message);
      return next(new Error("Unauthorized = Authentication falied"));
  }
};
