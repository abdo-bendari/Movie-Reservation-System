import mongoose, { Schema, Document } from "mongoose";

export interface ISeat extends Document {
  schedule: mongoose.Types.ObjectId;
  theater: mongoose.Types.ObjectId;
  seatNumber: string;
  isAvailable: boolean;
  user: mongoose.Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const seatSchema = new Schema<ISeat>(
  {
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    seatNumber: { type: String, required: true, unique: true },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Seat = mongoose.model<ISeat>("Seat", seatSchema);

export default Seat;
