import express, {Router} from "express"

// Controllers
import {getDinners} from "./week.controller.js"

const weekRouter: Router = express.Router()

// Get dinnerturns this week
weekRouter.get("/", getDinners)

export default weekRouter
