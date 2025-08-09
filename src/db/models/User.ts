import mongoose, {Schema, Document, Model} from "mongoose"

export interface TUser extends Document {
    name: string
    clerkId: string
    email: string
    totalDinners: number
    dinnersThisWeek: number
    avatarUrl: string
}

const userSchema = new Schema<TUser>(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        // Activity metrics
        totalDinners: {
            type: Number,
            required: true,
            default: 0
        },
        dinnersThisWeek: {
            type: Number,
            required: true,
            default: 0
        },
        avatarUrl: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
        collection: "user"
    }
)

export const userModel: Model<TUser> = mongoose.models.User || mongoose.model<TUser>("User", userSchema)
