import mongoose from "mongoose"
import {MONGO_URL} from "../config.js"

let isConnected = false

const connectToMongoDB = async () => {
    if (isConnected) return

    try {
        await mongoose.connect(MONGO_URL as string)
        isConnected = true
        console.log("MongoDB connected")
    } catch (err) {
        console.error("MongoDB connection error:", err)
    }
}

export default connectToMongoDB
