import mongoose, { Schema, Document } from "mongoose";
import { IGenre } from "./Genre";

export interface IMovie extends Document {
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  genres: IGenre[];
  actors: string[];
  director: string;
  imageUrl: string;
  schedule: mongoose.Types.ObjectId[];
  ratings: number;
  reviews: mongoose.Types.ObjectId[];
  reservations: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
const movieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    actors: [
      {
        type: String,
        required: true,
      },
    ],
    director: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    schedule: [
      {
        type: Schema.Types.ObjectId,
        ref: "Schedule",
        required: true,
      },
    ],
    ratings: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5],
    },
    reviews: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Review",
      },
    ],
    reservations: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Reservation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
