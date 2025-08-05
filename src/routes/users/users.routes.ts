import express, {Router} from "express"

import {getUsersInfo} from "./users.controller.js"

const usersRouter: Router = express.Router()

// Get users info
usersRouter.get("/", getUsersInfo)

export default usersRouter
