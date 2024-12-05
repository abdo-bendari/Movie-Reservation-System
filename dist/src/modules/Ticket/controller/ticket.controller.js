"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCancelledTickets = exports.getActiveTickets = exports.cancelTicket = exports.deleteTicket = exports.updateTicket = exports.getTicketsByReservation = exports.getTicketsByUser = exports.getTicketById = exports.getAllTickets = exports.createTicket = void 0;
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Ticket_1 = __importDefault(require("../../../../database/models/Ticket"));
exports.createTicket = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, reservation, seat, price, isCancelled, movie, purchaseDate, theater, schedule } = req.body;
    if (!user || !reservation || !seat || !price || !movie || !purchaseDate || !theater || !schedule) {
        return next(new Error_1.AppError("Please provide all required data", 400));
    }
    const ticket = new Ticket_1.default({
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
    yield ticket.save();
    return res.status(201).json({ message: "Ticket created successfully", ticket });
}));
exports.getAllTickets = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield Ticket_1.default.find().populate("user reservation seat movie");
    return tickets.length === 0
        ? next(new Error_1.AppError("No tickets found", 404))
        : res.status(200).json({ message: "Success", totalCount: tickets.length, tickets });
}));
exports.getTicketById = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError("Please provide ticket ID", 400));
    const ticket = yield Ticket_1.default.findById(id).populate("user reservation seat");
    if (!ticket)
        return next(new Error_1.AppError("Ticket not found", 404));
    return res.status(200).json({ message: "Success", ticket });
}));
exports.getTicketsByUser = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId)
        return next(new Error_1.AppError("Please provide user ID", 400));
    const tickets = yield Ticket_1.default.find({ user: userId }).populate("seat");
    return tickets.length === 0
        ? next(new Error_1.AppError("No tickets found for this user", 404))
        : res.status(200).json({ message: "Success", tickets });
}));
exports.getTicketsByReservation = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reservationId } = req.params;
    if (!reservationId)
        return next(new Error_1.AppError("Please provide reservation ID", 400));
    const tickets = yield Ticket_1.default.find({ reservation: reservationId }).populate("seat user");
    return tickets.length === 0
        ? next(new Error_1.AppError("No tickets found for this reservation", 404))
        : res.status(200).json({ message: "Success", tickets });
}));
exports.updateTicket = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError("Please provide ticket ID", 400));
    const { seat, price, purchaseDate } = req.body;
    const ticket = yield Ticket_1.default.findByIdAndUpdate(id, { seat, price, purchaseDate }, { new: true }).populate("user reservation seat");
    if (!ticket)
        return next(new Error_1.AppError("Ticket not found", 404));
    return res.status(200).json({ message: "Ticket updated successfully", ticket });
}));
exports.deleteTicket = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError("Please provide ticket ID", 400));
    const ticket = yield Ticket_1.default.findByIdAndDelete(id);
    if (!ticket)
        return next(new Error_1.AppError("Ticket not found", 404));
    return res.status(200).json({ message: "Ticket deleted successfully", ticket });
}));
exports.cancelTicket = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError("Please provide ticket ID", 400));
    const ticket = yield Ticket_1.default.findByIdAndUpdate(id, { isCancelled: true }, { new: true });
    if (!ticket)
        return next(new Error_1.AppError("Ticket not found", 404));
    return res.status(200).json({ message: "Ticket cancelled successfully", ticket });
}));
exports.getActiveTickets = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield Ticket_1.default.find({ isCancelled: false });
    return tickets.length === 0
        ? next(new Error_1.AppError("No active tickets found", 404))
        : res.status(200).json({ message: "Success", totalCount: tickets.length, tickets });
}));
exports.getCancelledTickets = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield Ticket_1.default.find({ isCancelled: true });
    return tickets.length === 0
        ? next(new Error_1.AppError("No cancelled tickets found", 404))
        : res.status(200).json({ message: "Success", tickets });
}));
