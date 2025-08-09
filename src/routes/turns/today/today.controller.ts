import type {Request, Response} from "express"

// DB Entities
import {dinnerTurnModel} from "../../../db/models/DinnerTurn.js"
import {userModel} from "../../../db/models/User.js"

// Time Mannagers
import {DateTime} from "luxon"
import {isWithinCDMXWeek, isCDMXMonday} from "../../../utils/TimeManagers.js"

// Create dinner
export const createDinner = async (req: Request, res: Response) => {
    try {
        const {cookId, registeredBy, dish, cookedAt} = req.body

        if (!cookId || !registeredBy || !dish || !cookedAt) {
            res.status(400).json({message: "Required fields are missing"})
            return
        }

        // Interpret date as CDMX time
        const cookedAtCDMX = DateTime.fromISO(cookedAt, {zone: "America/Mexico_City"}).toJSDate()

        if (isCDMXMonday()) {
            await userModel.updateMany({}, {$set: {dinnersThisWeek: 0}})
        }

        const newTurn = await dinnerTurnModel.create({
            cookId,
            registeredBy,
            dish,
            cookedAt: new Date(cookedAt)
        })

        const isWeekly = isWithinCDMXWeek(cookedAtCDMX)

        // Update user
        await userModel.findByIdAndUpdate(cookId, {
            $inc: {
                totalDinners: 1,
                ...(isWeekly && {dinnersThisWeek: 1})
            }
        })

        res.status(201).json({message: "Turno registrado", turn: newTurn})
        return
    } catch (err) {
        console.error("Error en manejo de usuario:", err)
        res.status(500).json({message: "Error interno del servidor"})
        return
    }
}

// Get dinner info
export const getDinner = async (req: Request, res: Response) => {
    res.status(201).json({})
    return
}

// Update dinner info
export const updateDinner = async (req: Request, res: Response) => {
    res.status(201).json({})
    return
}
