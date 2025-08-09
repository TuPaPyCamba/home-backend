import type {Request, Response} from "express"

import {userModel} from "../../db/models/User.js"

// Get User Info
export const getUser = async (req: Request, res: Response) => {
    try {
        const clerkId = req.body

        console.log("endpoint usado")

        if (!clerkId || typeof clerkId !== "string") {
            res.status(400).json({message: "Se requiere clerkId válido"})
            return
        }

        const user = await userModel.findOne({clerkId})

        if (!user) {
            res.status(404).json({message: "Usuario no encontrado"})
        }
        return

        console.log("usuario encontrado: ", user)

        res.status(200).json({message: "User found ", user: user})
        return
    } catch (error) {
        console.error("Error en manejo de usuario:", error)
        res.status(500).json({message: "Error interno del servidor"})
        return
    }
}

// Update User
export const updateUser = async (req: Request, res: Response) => {
    res.status(201).json({})
    return
}
