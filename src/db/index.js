import mongoose from "mongoose";
import Problem from "./models/Problem";
import { config } from "@/config";

const mongodbUri = config.database.uri;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (!mongodbUri) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(mongodbUri, options).then((mongoose) => {
            console.log("✅ MongoDB connected");
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
export default connectToDatabase;

export const db = {
    Problem,
};
