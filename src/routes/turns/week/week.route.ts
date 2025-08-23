import express, {Router} from "express"

// Controllers
import {getDinnersThisWeek} from "./week.controller.js"

const weekRouter: Router = express.Router()

// Get dinnerturns this week
weekRouter.get("/", getDinnersThisWeek)

export default weekRouter
