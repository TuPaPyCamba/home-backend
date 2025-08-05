import mongoose from "mongoose"

const {Schema} = mongoose

const userSchema = new Schema(
    {
        clerkId: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},

        // Activity metrics
        totalDinners: {type: Number, required: true, default: 0},
        dinnersThisWeek: {type: Number, required: true, default: 0},

        avatarUrl: {type: String, default: ""}
    },
    {timestamps: true}
)

export const userModel = mongoose.models.User || mongoose.model("User", userSchema, "user")
