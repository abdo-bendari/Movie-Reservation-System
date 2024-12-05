import { AppError } from "../../../utils/Error";
import catchError from "../../../middlewares/catchError";
import Ticket from "../../../../database/models/Ticket";
import { NextFunction, Request, Response } from "express";

export const createTicket = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { user, reservation, seat, price, isCancelled, movie,purchaseDate,theater,schedule} = req.body;

    if (!user || !reservation || !seat || !price ||!movie ||!purchaseDate ||!theater ||!schedule) {
        return next(new AppError("Please provide all required data", 400));
    }

    const ticket = new Ticket({
        user,
        reservation,
        seat,
        price,
        isCancelled: isCancelled || false,
        movie,
        purchaseDate,
        theater,
        schedule
    });

    await ticket.save();
    return res.status(201).json({ message: "Ticket created successfully", ticket });
});

export const getAllTickets = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find().populate("user reservation seat movie");
    return tickets.length === 0
        ? next(new AppError("No tickets found", 404))
        : res.status(200).json({ message: "Success", totalCount: tickets.length, tickets });
});

export const getTicketById = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) return next(new AppError("Please provide ticket ID", 400));

    const ticket = await Ticket.findById(id).populate("user reservation seat");
    if (!ticket) return next(new AppError("Ticket not found", 404));

    return res.status(200).json({ message: "Success", ticket });
});

export const getTicketsByUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    if (!userId) return next(new AppError("Please provide user ID", 400));

    const tickets = await Ticket.find({ user: userId }).populate("seat");
    return tickets.length === 0
        ? next(new AppError("No tickets found for this user", 404))
        : res.status(200).json({ message: "Success", tickets });
});

export const getTicketsByReservation = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { reservationId } = req.params;
    if (!reservationId) return next(new AppError("Please provide reservation ID", 400));

    const tickets = await Ticket.find({ reservation: reservationId }).populate("seat user");
    return tickets.length === 0
        ? next(new AppError("No tickets found for this reservation", 404))
        : res.status(200).json({ message: "Success", tickets });
});


export const updateTicket = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) return next(new AppError("Please provide ticket ID", 400));

    const {  seat, price , purchaseDate} = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
        id,
        {  seat, price , purchaseDate },
        { new: true }
    ).populate("user reservation seat");

    if (!ticket) return next(new AppError("Ticket not found", 404));

    return res.status(200).json({ message: "Ticket updated successfully", ticket });
});

export const deleteTicket = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) return next(new AppError("Please provide ticket ID", 400));

    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) return next(new AppError("Ticket not found", 404));

    return res.status(200).json({ message: "Ticket deleted successfully", ticket });
});

export const cancelTicket = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) return next(new AppError("Please provide ticket ID", 400));

    const ticket = await Ticket.findByIdAndUpdate(id, { isCancelled: true }, { new: true })

    if (!ticket) return next(new AppError("Ticket not found", 404));

    return res.status(200).json({ message: "Ticket cancelled successfully", ticket });
});

export const getActiveTickets = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({ isCancelled: false })
    return tickets.length === 0
        ? next(new AppError("No active tickets found", 404))
        : res.status(200).json({ message: "Success", totalCount : tickets.length ,tickets });
});

export const getCancelledTickets = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({ isCancelled: true })
    return tickets.length === 0
        ? next(new AppError("No cancelled tickets found", 404))
        : res.status(200).json({ message: "Success", tickets });
});
