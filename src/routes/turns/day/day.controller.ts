import type {Request, Response} from "express"

// DB Entities
import {dinnerTurnModel} from "../../../db/models/DinnerTurn.js"
import {userModel} from "../../../db/models/User.js"

// Time Mannagers
import {DateTime} from "luxon"
import {isWithinCDMXWeek, isCDMXMonday} from "../../../utils/TimeManagers.js"

// Create dinner for today
export const createDinner = async (req: Request, res: Response) => {
    try {
        const {cookId, registeredBy, dish} = req.body

        if (!cookId || !registeredBy || !dish) {
            console.log("aca valio madree")
            res.status(400).json({error: "Faltan campos obligatorios"})
            return
        }

        // 🕒 Generar fecha actual en CDMX
        const cookedAtCDMX = DateTime.now().setZone("America/Mexico_City").toJSDate()

        if (isCDMXMonday()) {
            await userModel.updateMany({}, {$set: {dinnersThisWeek: 0}})
        }

        const cookedBy = await userModel.findById(cookId)
        const registerBy = await userModel.findById(registeredBy)

        if (!cookedBy || !registerBy) {
            res.status(404).json({error: "Usuario no encontrado"})
            return
        }

        const newTurn = await dinnerTurnModel.create({
            cookId: cookedBy._id,
            registeredBy: registerBy._id,
            dish,
            cookedAt: cookedAtCDMX // ⏱️ Fecha generada por el servidor
        })

        const isWeekly = isWithinCDMXWeek(cookedAtCDMX)

        await userModel.findByIdAndUpdate(cookId, {
            $inc: {
                totalDinners: 1,
                ...(isWeekly && {dinnersThisWeek: 1})
            }
        })

        res.status(201).json({message: "Turno registrado", turn: newTurn})
        return
    } catch (error) {
        console.error("Error al guardar turno:", error)
        res.status(500).json({error: "Error en el servidor"})
        return
    }
}

// Get dinner info for today
export const getDinner = async (req: Request, res: Response) => {
    res.status(201).json({})
    return
}

// Update dinner info for today
export const updateDinner = async (req: Request, res: Response) => {
    res.status(201).json({})
    return
}

// Get dinner from yesterday Ready
export const getYesterdayDinner = async (req: Request, res: Response) => {
    try {
        const timeZone = "America/Mexico_City"
        const yesterday = DateTime.now().setZone(timeZone).minus({days: 1})
        const yesterdayStart = yesterday.startOf("day").toJSDate()
        const yesterdayEnd = yesterday.endOf("day").toJSDate()
        const day = yesterday.setLocale("es").toFormat("cccc")

        const yesterdayDinner = await dinnerTurnModel.find({cookedAt: {$gte: yesterdayStart, $lte: yesterdayEnd}}).limit(1)

        if (yesterdayDinner.length === 0) {
            res.status(200).json({
                registrado: false,
                message: `No records found for the day ${day}`,
                dinner: []
            })
            return
        }

        res.status(200).json({
            registrado: true,
            message: `Record found for the day ${day}`,
            dinner: yesterdayDinner
        })
        return
    } catch (err) {
        console.error("Error checking yesterday's dinner:", err)
        res.status(500).json({message: "Internal Server Error."})
        return
    }
}

// Post create a yesterdar dinner
export const createYesterdayDinner = async (req: Request, res: Response) => {
    try {
        const {cookId, registeredBy, dish} = req.body

        if (!cookId || !registeredBy || !dish) {
            res.status(400).json({error: true, message: "Required fields are missing."})
            return
        }

        console.log("jalando")

        const timeZone = "America/Mexico_City"
        const yesterday8pm = DateTime.now().setZone(timeZone).minus({days: 1}).set({hour: 20, minute: 0, second: 0})
        const cookedAt = yesterday8pm.toJSDate()

        const nuevaCena = await dinnerTurnModel.create({
            cookedAt,
            cookId,
            dish,
            registeredBy
        })

        res.status(201).json({error: false, message: "Dinner successfully registered.", data: nuevaCena})
        return
    } catch (err) {
        console.error("Error registering dinner:", err)
        res.status(500).json({error: true, message: "Internal Server Error."})
        return
    }
}
