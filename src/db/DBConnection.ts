import mongoose from "mongoose"
import {MONGO_URL} from "../config.js"

let isConnected = false

const connectToMongoDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) return

    try {
        await mongoose.connect(MONGO_URL as string, {
            dbName: "HomeDB" // opcional pero recomendado
        })

        isConnected = true
        if (process.env.NODE_ENV === "development") {
            console.log("✅ MongoDB connected")
        }
    } catch (err) {
        console.error("❌ MongoDB connection error:", err)
    }
}

export default connectToMongoDB
