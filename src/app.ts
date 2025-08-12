// Express
import express, {type Express} from "express"

// Settings
import cookieParser from "cookie-parser"
import cors from "cors"

// Routes
import router from "./routes/index.js"

// DB
import connectToMongoDB from "./db/DBConnection.js"

// middlewares
import validateApiKey from "./middlewares/validateApiKey.js"

const app: Express = express()

// basic settings
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH"],
        credentials: true
    })
)

// Main route PROTECTED
app.use("/api", validateApiKey, router)

// DB Connection
connectToMongoDB()

export default app
