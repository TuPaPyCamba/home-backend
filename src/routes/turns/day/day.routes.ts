import express, {Router} from "express"

// Controllers
import {createDinner, createYesterdayDinner, getDinner, getYesterdayDinner, updateDinner} from "./day.controller.js"

const dayRouter: Router = express.Router()

// POST create today dinner
dayRouter.post("/", createDinner)

// GET get today dinner
dayRouter.get("/", getDinner)

// PATCH update today dinner
dayRouter.patch("/", updateDinner)

// GET dinner from yesterday Ready
dayRouter.get("/yesterday", getYesterdayDinner)

// POST create a yesterdar dinner
dayRouter.post("/yesterday", createYesterdayDinner)

export default dayRouter
