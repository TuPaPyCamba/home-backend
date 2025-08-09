import type {Request, Response} from "express"

import {userModel} from "../../db/models/User.js"

// Get User Info
export const getUsersInfo = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find({})
        console.log(users)

        if (users.length === 0) {
            res.status(404).json({message: "No users found"})
            return
        }

        console.log("users: ", users)

        res.status(200).json({message: "Users found", users: users})

        return
    } catch (err) {
        console.error("Error en manejo de usuario:", err)
        res.status(500).json({message: "Error interno del servidor"})
        return
    }
}
