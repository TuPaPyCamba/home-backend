import type {Request, Response} from "express"

// Data base Tools
import connectToMongoDB from "../../../db/DBConnection.js"
import mongoose from "mongoose"

// Data base models
import {dinnerTurnModel} from "../../../db/models/DinnerTurn.js"
import {userModel} from "../../../db/models/User.js"

// Time managers
import {getStartOfCDMXWeek} from "../../../utils/TimeManagers.js"
import {DateTime} from "luxon"

// Get Dinners this week
export const getDinnersThisWeek = async (req: Request, res: Response) => {
    try {
        await connectToMongoDB()

        const endCDMX = DateTime.now().setZone("America/Mexico_City").endOf("day").toJSDate()
        const startCDMX = getStartOfCDMXWeek()

        mongoose.model("User", userModel.schema)

        const records = await dinnerTurnModel
            .find({
                cookedAt: {
                    $gte: startCDMX,
                    $lte: endCDMX
                }
            })
            .sort({cookedAt: 1})
            .populate({path: "cookId", model: "User", select: "name _id avatarUrl"})
            .populate({path: "registeredBy", model: "User", select: "name _id"})

        res.status(200).json({message: "", records: records})
        return
    } catch (error) {
        console.error("Error getting records for the week:", error)
        res.status(500).json({message: "Internal server error"})
        return
    }
}
