import express, {Router} from "express"

// Routes
import todayRouter from "./today/today.routes.js"
import weekRouter from "./week/week.route.js"

const turnRouter: Router = express.Router()

turnRouter.use("/today", todayRouter)
turnRouter.use("/week", weekRouter)

export default turnRouter
