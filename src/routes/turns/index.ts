import express, {Router} from "express"

// Routes
import dayRouter from "./day/day.routes.js"
import weekRouter from "./week/week.route.js"

const turnRouter: Router = express.Router()

turnRouter.use("/day", dayRouter)
turnRouter.use("/week", weekRouter)

export default turnRouter
