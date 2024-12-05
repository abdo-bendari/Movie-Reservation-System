import mongoose, { Schema, Document } from "mongoose";

export interface ITheater extends Document {
  name: string; 
  location: {
    address: string; 
    city: string;
    state: string;
    zipCode: string;
  }
  totalSeats: number; 
  availableSeats: number; 
  movies: mongoose.Types.ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

const TheaterSchema = new Schema<ITheater>(
  {
    name: {
      type: String,
      required: [true, "Theater name is required"],
      trim: true,
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    totalSeats: {
      type: Number,
      required: [true, "Total seats are required"],
      min: [1, "Total seats must be at least 1"],
    },
    availableSeats: {
      type: Number,
      required: true,
      min: [0, "Available seats cannot be negative"],
    },
    movies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);
const Theater = mongoose.model<ITheater>("Theater", TheaterSchema);
export default Theater;
