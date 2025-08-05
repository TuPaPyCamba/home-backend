import express, {Router} from "express"

import {updateUser, getUser} from "./user.controller.js"

const userRouter: Router = express.Router()

userRouter.patch("/", updateUser)

// GetUserByClerkId
userRouter.get("/", getUser)

// GetUserByMongoId Maybe

export default userRouter
