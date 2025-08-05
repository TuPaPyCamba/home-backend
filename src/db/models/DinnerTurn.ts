import mongoose from "mongoose"

const {Schema} = mongoose

const dinnerTurnSchema = new Schema(
    {
        cookId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        registeredBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        dish: {type: String, required: true},
        cookedAt: {type: Date, required: true}
    },
    {timestamps: true}
)

export const dinnerTurnModel = mongoose.models.DinnerTurn || mongoose.model("DinnerTurn", dinnerTurnSchema, "dinnerTurn")
