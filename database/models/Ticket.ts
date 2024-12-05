import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  user: mongoose.Types.ObjectId; 
  reservation: mongoose.Types.ObjectId; 
  movie: mongoose.Types.ObjectId; 
  seat: mongoose.Types.ObjectId; 
  theater: mongoose.Types.ObjectId; 
  schedule: mongoose.Types.ObjectId; 
  price: number; 
  purchaseDate: Date; 
  isCancelled: boolean; 
  createdAt?: Date;
  updatedAt?: Date;
}

const TicketSchema: Schema<ITicket> = new Schema<ITicket>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    seat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);

export default Ticket;
