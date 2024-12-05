import { AppError } from "../../../utils/Error";
import catchError from "../../../middlewares/catchError";
import Payment from "../../../../database/models/Payment";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe"; 
import Reservation from "../../../../database/models/Reservation";

const stripeClient = new Stripe (  "sk_test_51Q8k4oADDE4xwbMLuk629gfxCdDQUm45jsTiIFtMtGQlUvUK7kQe9fPwC8GbJh4gSy6c9Bk2P3BAOA7OYgEafJ9O00JKikJHjm"
);

export const createPayment = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { user, reservation, amount, method } = req.body;

  if (!user || !reservation || !amount || !method) {
    return next(new AppError("Please provide all required fields", 400));
  }

  // Ensure the reservation exists and belongs to the user
  const existingReservation = await Reservation.findById(reservation);
  if (!existingReservation || existingReservation.user.toString() !== user) {
    return next(new AppError("Invalid reservation or user mismatch", 404));
  }

  let transactionId: string | undefined;

  // Handle Stripe payment
  if (method === "Card") {
    try {
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: amount * 100, 
        currency: "usd",
        metadata: { reservationId: reservation, userId: user },
      });
      transactionId = paymentIntent.id; 
    } catch (error) {
      return next(new AppError("Card payment failed: " , 500));
    }
  } else if (method !== "Cash") {
    return next(new AppError("Invalid payment method. Use 'Card' or 'Cash'.", 400));
  }

  const payment = new Payment({
    user,
    reservation,
    amount,
    method,
    status: method === "Cash" ? "Completed" : "Pending",
    transactionId,
  });
  await payment.save();

  res.status(201).json({
    message: "Payment created successfully",
    payment,
  });
});

export const getAllPayments = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const payments = await Payment.find().populate("user reservation");
    if (payments.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }
    res.status(200).json({ message: "Success", total: payments.length, payments });
  });

  export const getPaymentById = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payment = await Payment.findById(id).populate("user reservation");
    if (!payment) {
      return next(new AppError("Payment not found", 404));
    }
    res.status(200).json({ message: "Success", payment });
  });

  export const updatePaymentStatus = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!status || !["Pending", "Completed", "Failed"].includes(status)) {
      return next(new AppError("Invalid or missing status", 400));
    }
  
    const payment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  
    if (!payment) {
      return next(new AppError("Payment not found", 404));
    }
  
    res.status(200).json({ message: "Payment status updated successfully", payment });
  });

  export const deletePayment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return next(new AppError("Payment not found", 404));
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  });
