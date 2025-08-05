import express, {Router} from "express"

// Controllers
import {getUsersInfo} from "./users.controller.js"

const usersRouter: Router = express.Router()

// Get users info
usersRouter.get("/", getUsersInfo)

export default usersRouter
