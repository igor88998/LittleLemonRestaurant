import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    if (isAdmin()) {
        const users = await User.find()
        return Response.json(users)
    } else {
        return Response.json([])
    }
}