import express, {Router} from "express"

// Controllers
import {updateUser, getUser} from "./user.controller.js"

const userRouter: Router = express.Router()

// Update User by clerkId
userRouter.patch("/", updateUser)

// GetUserByClerkId
userRouter.get("/", getUser)

// GetUserByMongoId Maybe

export default userRouter
