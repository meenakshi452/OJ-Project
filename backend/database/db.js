import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const DBConnection = async () => {
    const MONGODB_URL = process.env.MONGODB_URI;
    const client = await new MongoClient(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
        socketTimeoutMS: 60000, // Increase to 60 seconds
        tls: true, // Enable TLS/SSL
        tlsInsecure: true,
        serverApi: {
            version: ServerApiVersion.v1,
            strict:true,
            deprecationErrors: true,
        },
      });
    try {
        await mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
        console.log("DB connection established!!");
    } catch (error) {
        console.log(error);
    }
};

export default DBConnection;