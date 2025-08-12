// Solo carga .env en desarrollo local
if (process.env.NODE_ENV !== "production") {
    try {
        await import("dotenv").then((dotenv) => dotenv.config())
    } catch (err) {
        console.warn("⚠️ dotenv no cargado:", err)
    }
}

export const API_KEY = process.env.API_KEY
export const MONGO_URL = process.env.MONGO_URL
