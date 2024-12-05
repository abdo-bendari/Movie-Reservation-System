import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  user: mongoose.Types.ObjectId; 
  seat: mongoose.Types.ObjectId; 
  schedule: mongoose.Types.ObjectId; 
  movie: mongoose.Types.ObjectId; 
  reservationDate: Date; 
  isPaid: boolean; 
  createdAt?: Date;
  updatedAt?: Date;
}

const reservationSchema = new Schema<IReservation>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  seat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
    required: true
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie", 
    required: true
  },
  reservationDate: {
    type: Date,
    required: true,
    default: Date.now 
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false 
  }
}, { timestamps: true });

const Reservation = mongoose.model<IReservation>("Reservation", reservationSchema);

export default Reservation;
