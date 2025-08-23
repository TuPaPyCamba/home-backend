import type {Request, Response} from "express"

import {userModel} from "../../db/models/User.js"

import connectToMongoDB from "../../db/DBConnection.js"

// Get User Info
export const getUser = async (req: Request, res: Response) => {
    try {
        await connectToMongoDB()

        const clerkId = req.body

        console.log("endpoint usado")

        if (!clerkId || typeof clerkId !== "string") {
            res.status(400).json({message: "Se requiere clerkId válido"})
            return
        }

        const user = await userModel.findOne({clerkId})

        if (!user) {
            res.status(404).json({message: "Usuario no encontrado"})
            return
        }

        res.status(200).json({message: "User found ", user: user})
        return
    } catch (error) {
        console.error("Error en manejo de usuario:", error)
        res.status(500).json({message: "Internal server error"})
        return
    }
}

// Update User
export const updateUser = async (req: Request, res: Response) => {
    try {
        await connectToMongoDB()

        const {clerkId, updates} = req.body

        if (!clerkId || typeof updates !== "object") {
            res.status(400).json({error: true, message: "Faltan datos o formato incorrecto."})
            return
        }

        const user = await userModel.findOne({clerkId})

        if (!user) {
            res.status(404).json({error: true, message: "Usuario no encontrado."})
            return
        }

        // Campos permitidos para actualizar
        const allowedFields = ["name", "email", "avatarUrl", "totalDinners", "dinnersThisWeek"]
        for (const key of Object.keys(updates)) {
            if (allowedFields.includes(key)) {
                // @ts-ignore
                user[key] = updates[key]
            }
        }

        await user.save()

        res.status(200).json({success: true, message: "Usuario actualizado", user})
        return
    } catch (error) {
        console.error("Error en manejo de usuario:", error)
        res.status(500).json({message: "Internal server error"})
        return
    }
}
