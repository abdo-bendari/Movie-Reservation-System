import mongoose, { Schema, Document } from "mongoose";

export interface ISchedule extends Document {
  movie: mongoose.Types.ObjectId ; 
  theater: mongoose.Types.ObjectId ;
  date: Date; 
  availableSeats: number; 
  totalSeats: number; 
  createdAt?: Date;
  updatedAt?: Date;
}

const ScheduleSchema: Schema = new Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model<ISchedule>("Schedule", ScheduleSchema);
export default Schedule;
