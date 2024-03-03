import mongoose from "mongoose"
import { Reservation } from "../../models/Reservation"
import { isAdmin } from "../auth/[...nextauth]/route"

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json()
    if (await isAdmin()) {
        const ReservationDoc = await Reservation.create(data)
        return Response.json(ReservationDoc)
    } else {
        return Response.json({})
    }
}