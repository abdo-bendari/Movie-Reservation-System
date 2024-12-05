import { AppError } from './../utils/Error';
import globalError from '../middlewares/globalError';
import express, { Express, Request, Response, NextFunction } from "express";
import movieRouter from './Movie/movie.routes';
import authRouter from './Auth/auth.routes';
import genreRouter from './Genre/genre.routes';
import theaterRouter from './Theater/theater.routes';
import scheduleRouter from './Schedule/schedule.routes';
import seatRouter from './Seat/seat.routes';
import reservationRouter from './Reservation/reservation.routes';
import ticketRouter from './Ticket/ticket.routes';
import paymentRouter from './Payment/payment.routes';
import reviewRouter from './Review/review.routes';
import notificationRouter from './Notification/notification.routes';
import chatRouter from './Chat/chat.routes';


const bootstrap = (app: Express) => {
  process.on("uncaughtException", (err: Error) => {
    console.error("Uncaught Exception:", err);
  });
  app.use(express.json());
  const baseUrl = "/api/v1";
  // Uncomment these routes once you have the routers ready
  app.use(`${baseUrl}/movies`, movieRouter);
  app.use(`${baseUrl}/auth`, authRouter);
  app.use(`${baseUrl}/genres`, genreRouter);
  app.use(`${baseUrl}/theaters`, theaterRouter);
  app.use(`${baseUrl}/schedules`, scheduleRouter);
  app.use(`${baseUrl}/seats`, seatRouter);
  app.use(`${baseUrl}/reservations`, reservationRouter);
  app.use(`${baseUrl}/tickets`, ticketRouter);
  app.use(`${baseUrl}/payments`, paymentRouter);
  app.use(`${baseUrl}/reviews`, reviewRouter);
  app.use(`${baseUrl}/notifications`, notificationRouter);
  app.use(`${baseUrl}/chats`, chatRouter);

  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError("Route not found", 404));
  });
  process.on("unhandledRejection", (err: Error) => {
    console.error("Unhandled Rejection:", err);
  });
  app.use(globalError);
};

export default bootstrap;
