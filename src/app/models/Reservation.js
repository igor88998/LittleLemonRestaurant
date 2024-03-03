import { Schema, model, models } from "mongoose";

const ReservationSchema = new Schema({
    date: {type: Date},
    time: {type: String},
    amount: {type: Number},
    name: {type: String},
    phone: {type: String},
}, {timestamps: true})

export const Reservation = models?.Reservation || model('Reservation', ReservationSchema)
