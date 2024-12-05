import { AppError } from './../../../utils/Error';
import catchError from '../../../middlewares/catchError';
import Movie from '../../../../database/models/Movie';
import { NextFunction, Request, Response } from "express";

export const addMovie = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, releaseDate, duration, genres, actors, director, imageUrl, schedule, reservations ,reviews,ratings } = req.body;
  
  if (!title || !description || !releaseDate || !duration || !genres || !actors || !director) {
    return next(new AppError("Please provide all data", 400));
  }
  const movie = new Movie({
    title,
    description,
    releaseDate,
    duration,
    genres,
    actors,
    director,
    imageUrl,
    schedule,
    reservations ,
    reviews,
    ratings
  });

  await movie.save();
  return res.status(201).json({ message: "New movie added successfully", movie });
});

export const getAllMovies = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const movies = await Movie.find();
    return movies.length === 0
      ? next(new AppError('No movies found', 404))
      : res.status(200).json({ message: 'Success', totalCount: movies.length, movies });
  });
  
  export const getMovieByTitleOrId = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { title, id } = req.query;
    if (!title && !id) {return next(new AppError('Please provide title or id', 400));}
    const movie = await Movie.findOne({ $or: [{ title: title }, { _id: id }] });
    if (!movie) {
      return next(new AppError('Movie not found', 404));
    }
    return res.status(200).json({ message: 'Success', movie });
  });

  export const updateMovie = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return next(new AppError('Please provide id', 400));
    }
    const { title, description, releaseDate, duration, genres, actors, director, imageUrl, schedule } = req.body;
    const movie = await Movie.findByIdAndUpdate(
      id,
      { title, description, releaseDate, duration, genres, actors, director, imageUrl, schedule },
      { new: true }
    );
    if (!movie) {
      return next(new AppError('Movie not found', 404));
    }
    return res.status(200).json({ message: 'Movie updated successfully', movie });
  });


  export const deleteMovie = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return next(new AppError('Please provide id', 400));
    }
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return next(new AppError('Movie not found', 404));
    }
    return res.status(200).json({ message: 'Movie deleted successfully' });
  });
  
  export const getMoviesByActor = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { actor } = req.query;
    if (!actor) {
      return next(new AppError('Please provide actor name', 400));
    }
    const movies = await Movie.find({ actors: { $in: [actor] } });
    if (movies.length === 0) {
      return next(new AppError('No movies found for this actor', 404));
    }
    return res.status(200).json({ message: 'Success', movies });
  });
  
  export const getTopRatedMovies = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const movies = await Movie.find().sort({ ratings: -1 }).limit(5);
    if (movies.length === 0) {
      return next(new AppError('No top-rated movies found', 404));
    }
    return res.status(200).json({ message: 'Success', movies });
  });
  