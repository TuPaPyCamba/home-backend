import express, {Router} from "express"

// Routes
import userRouter from "./user/user.routes.js"
import turnRouter from "./turns/index.js"
import usersRouter from "./users/users.routes.js"

const router: Router = express.Router()

router.use("/turn", turnRouter)
router.use("/user", userRouter)
router.use("/users", usersRouter)

export default router
