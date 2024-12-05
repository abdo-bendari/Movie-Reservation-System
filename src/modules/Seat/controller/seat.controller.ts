import { AppError } from "../../../utils/Error";
import catchError from "../../../middlewares/catchError";
import Seat from "../../../../database/models/Seat";
import { Request, Response, NextFunction } from "express";


export const addSeat = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { schedule, theater, seatNumber, user } = req.body;

  if (!schedule || !theater || !seatNumber) {
    return next(new AppError("Please provide all required data (schedule, theater, seatNumber)", 400));
  }

  const seat = new Seat({
    schedule,
    theater,
    seatNumber,
    isAvailable: true,  
    user
  });

  await seat.save();
  return res.status(201).json({ message: "Seat added successfully", seat });
});

export const getAllSeats = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const seats = await Seat.find();
  
  if (seats.length === 0) {
    return next(new AppError("No seats found", 404));
  }

  return res.status(200).json({ message: "Seats retrieved successfully", seats });
});

export const getSeatByIdOrNumber = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { id, seatNumber } = req.query;

  if (!id && !seatNumber) {
    return next(new AppError("Please provide either seat ID or seat number", 400));
  }

  const seat = await Seat.findOne({
    $or: [{ _id: id }, { seatNumber: seatNumber }],
  }).populate('schedule').populate('user')

  if (!seat) {
    return next(new AppError("Seat not found", 404));
  }

  return res.status(200).json({ message: "Seat retrieved successfully", seat });
});

export const updateSeatStatus = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { isAvailable } = req.body;

  if (!id || (isAvailable === undefined)) {
    return next(new AppError("Please provide seat ID and availability status", 400));
  }

  const seat = await Seat.findByIdAndUpdate(
    id,
    { isAvailable },
    { new: true }
  );

  if (!seat) {
    return next(new AppError("Seat not found", 404));
  }

  return res.status(200).json({ message: "Seat status updated successfully", seat });
});

export const deleteSeat = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide seat ID", 400));
  }

  const seat = await Seat.findByIdAndDelete(id);

  if (!seat) {
    return next(new AppError("Seat not found", 404));
  }

  return res.status(200).json({ message: "Seat deleted successfully" });
});
