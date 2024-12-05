import { AppError } from "../../../utils/Error";
import catchError from "../../../middlewares/catchError";
import Theater from "../../../../database/models/Theater";
import { NextFunction, Request, Response } from "express";
export const addTheater = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { name, location, totalSeats, availableSeats , movies} = req.body;

  if (!name || !location || !totalSeats) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const theater = new Theater({
    name,
    location,
    totalSeats,
    availableSeats: availableSeats || totalSeats, 
    movies,
  });

  await theater.save();

  return res.status(201).json({
    message: "Theater added successfully",
    theater,
  });
});

export const getAllTheaters = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { city } = req.query;
  
    const query = city ? { "location.city": city } : {};
    const theaters = await Theater.find(query);
  
    if (!theaters.length) {
      return next(new AppError("No theaters found", 404));
    }
  
    return res.status(200).json({
      message: "Success",
      totalCount: theaters.length,
      theaters,
    });
  });
  
  export const getTheaterById = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    const theater = await Theater.findById(id);
  
    if (!theater) {
      return next(new AppError("Theater not found", 404));
    }
    return res.status(200).json({
      message: "Success",
      theater,
    });
  });
  
  export const updateTheater = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;
  
    const theater = await Theater.findByIdAndUpdate(id, updateData, { new: true });
  
    if (!theater) {
      return next(new AppError("Theater not found", 404));
    }
  
    return res.status(200).json({
      message: "Theater updated successfully",
      theater,
    });
  });

  export const deleteTheater = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    const theater = await Theater.findByIdAndDelete(id);
  
    if (!theater) {
      return next(new AppError("Theater not found", 404));
    }
  
    return res.status(200).json({
      message: "Theater deleted successfully",
    });
  });
  
  export const addMoviesToTheater = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { movies } = req.body;
  
    if (!movies || !Array.isArray(movies)) {
      return next(new AppError("Please provide a valid list of movie IDs", 400));
    }
  
    const theater = await Theater.findByIdAndUpdate(
      id,
      { $addToSet: { movies: { $each: movies } } },
      { new: true }
    );
  
    if (!theater) {
      return next(new AppError("Theater not found", 404));
    }
  
    return res.status(200).json({
      message: "Movies added to theater successfully",
      theater,
    });
  });
  
  export const getMoviesInTheater = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    const theater = await Theater.findById(id).populate("movies")
  
    if (!theater) {
      return next(new AppError("Theater not found", 404));
    }
  
    return res.status(200).json({
      message: "Success",
      movies: theater.movies,
    });
  });
  