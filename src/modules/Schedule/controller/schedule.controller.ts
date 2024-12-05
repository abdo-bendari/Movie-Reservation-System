import { AppError } from "../../../utils/Error";
import catchError from "../../../middlewares/catchError";
import Schedule from "../../../../database/models/Schedule";
import { Request, Response, NextFunction } from "express";

export const createSchedule = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { movie, theater, date, availableSeats, totalSeats } = req.body;

    if (!movie || !theater || !date || !availableSeats || !totalSeats) {
      return next(new AppError("Please provide all necessary data", 400));
    }

    const schedule = new Schedule({
      movie,
      theater,
      date,
      availableSeats,
      totalSeats,
    });

    await schedule.save();
    return res
      .status(201)
      .json({ message: "Schedule created successfully", schedule });
  }
);

export const getAllSchedules = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const schedules = await Schedule.find()
      .populate("movie")
      .populate("theater");

    if (schedules.length === 0) {
      return next(new AppError("No schedules found", 404));
    }

    return res.status(200).json({ message: "Success", schedules });
  }
);

export const getScheduleByMovieOrTheater = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { movieId, theaterId } = req.query;

    if (!movieId && !theaterId) {
      return next(new AppError("Please provide movieId or theaterId", 400));
    }

    const filter: any = {};

    if (movieId) filter.movie = movieId;
    if (theaterId) filter.theater = theaterId;

    const schedules = await Schedule.find(filter)
      .populate("movie")
      .populate("theater");

    if (schedules.length === 0) {
      return next(new AppError("No schedules found", 404));
    }

    return res.status(200).json({ message: "Success", schedules });
  }
);

export const updateSchedule = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) return next(new AppError("Please provide schedule ID", 400));

    const { movie, theater, date, availableSeats, totalSeats } = req.body;

    const schedule = await Schedule.findByIdAndUpdate(
      id,
      { movie, theater, date, availableSeats, totalSeats },
      { new: true }
    )
      .populate("movie")
      .populate("theater");

    if (!schedule) {
      return next(new AppError("Schedule not found", 404));
    }

    return res
      .status(200)
      .json({ message: "Schedule updated successfully", schedule });
  }
);

export const deleteSchedule = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    if (!id) return next(new AppError("Please provide schedule ID", 400));
  
    const schedule = await Schedule.findByIdAndDelete(id);
  
    if (!schedule) {
      return next(new AppError("Schedule not found", 404));
    }
  
    return res.status(200).json({ message: "Schedule deleted successfully" });
  });
  