import express, {Router} from "express"

// Controllers
import {createDinner, getDinner, updateDinner} from "./today.controller.js"

const todayRouter: Router = express.Router()

// POST create todar dinner
todayRouter.get("/", createDinner)

// GET get today dinner
todayRouter.get("/", getDinner)

// PATCH update today dinner
todayRouter.get("/", updateDinner)

export default todayRouter
