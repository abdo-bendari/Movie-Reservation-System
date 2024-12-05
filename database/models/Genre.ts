import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGenre extends Document {
  name: string;
  description?: string;
  movies: mongoose.Types.ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

const genreSchema: Schema<IGenre> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Genre name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

const Genre: Model<IGenre> = mongoose.model<IGenre>("Genre", genreSchema);

export default Genre;
