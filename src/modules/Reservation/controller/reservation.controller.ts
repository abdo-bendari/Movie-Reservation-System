import { AppError } from "../../../utils/Error";
import catchError from "../../../middlewares/catchError";
import Reservation from "../../../../database/models/Reservation";
import { NextFunction, Request, Response } from "express";


export const createReservation = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { user, seat, schedule, movie, reservationDate, isPaid } = req.body;

  if (!user || !seat || !schedule || !movie || !reservationDate) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const reservation = new Reservation({
    user,
    seat,
    schedule,
    movie,
    reservationDate,
    isPaid: isPaid || false, 
  });

  await reservation.save();

  return res.status(201).json({
    message: "Reservation created successfully",
    reservation,
  });
});
export const getAllReservations = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const reservations = await Reservation.find().populate("user").populate("seat").populate("schedule").populate("movie");
  
    if (reservations.length === 0) {
      return next(new AppError("No reservations found", 404));
    }
  
    return res.status(200).json({
      message: "Reservations fetched successfully",
      totalCount: reservations.length,
      reservations,
    });
  });
  
  export const getReservationById = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    if (!id) return next(new AppError("Please provide reservation ID", 400));
  
    const reservation = await Reservation.findById(id)
      .populate("user")
      .populate("seat")
      .populate("schedule")
      .populate("movie");
  
    if (!reservation) {
      return next(new AppError("Reservation not found", 404));
    }
  
    return res.status(200).json({
      message: "Reservation fetched successfully",
      reservation,
    });
  });

  export const updatePaymentStatus = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { isPaid } = req.body;
  
    if (!id) return next(new AppError("Please provide reservation ID", 400));
    if (isPaid === undefined) return next(new AppError("Please provide the payment status", 400));
  
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { isPaid },
      { new: true }
    );
  
    if (!reservation) {
      return next(new AppError("Reservation not found", 404));
    }
  
    return res.status(200).json({
      message: "Payment status updated successfully",
      reservation,
    });
  });

  export const deleteReservation = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    if (!id) return next(new AppError("Please provide reservation ID", 400));
  
    const reservation = await Reservation.findByIdAndDelete(id);
  
    if (!reservation) {
      return next(new AppError("Reservation not found", 404));
    }
  
    return res.status(200).json({
      message: "Reservation deleted successfully",
    });
  });
  
  