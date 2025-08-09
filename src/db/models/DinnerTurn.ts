import mongoose, {Schema, Document, Model} from "mongoose"

export interface TDinnerTurn extends Document {
    cookId: mongoose.Types.ObjectId
    registeredBy: mongoose.Types.ObjectId
    dish: string
    cookedAt: Date
}

const dinnerTurnSchema = new Schema<TDinnerTurn>(
    {
        cookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        registeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        dish: {
            type: String,
            required: true,
            trim: true
        },
        cookedAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    {
        timestamps: true,
        collection: "dinnerTurn"
    }
)

export const dinnerTurnModel: Model<TDinnerTurn> = mongoose.models.DinnerTurn || mongoose.model("DinnerTurn", dinnerTurnSchema)
