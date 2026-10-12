import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const { MONGO_URL } = process.env;
        if(!MONGO_URL){
            throw new Error("MONGO_URL Is not set");
            
        }

        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODBconnected", conn.connection.host);
        
    } catch (error) {
        console.error("Error", error);
        process.exit(1);
    }
}