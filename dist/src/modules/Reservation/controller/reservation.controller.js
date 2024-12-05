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
exports.deleteReservation = exports.updatePaymentStatus = exports.getReservationById = exports.getAllReservations = exports.createReservation = void 0;
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Reservation_1 = __importDefault(require("../../../../database/models/Reservation"));
exports.createReservation = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, seat, schedule, movie, reservationDate, isPaid } = req.body;
    if (!user || !seat || !schedule || !movie || !reservationDate) {
        return next(new Error_1.AppError("Please provide all required fields", 400));
    }
    const reservation = new Reservation_1.default({
        user,
        seat,
        schedule,
        movie,
        reservationDate,
        isPaid: isPaid || false,
    });
    yield reservation.save();
    return res.status(201).json({
        message: "Reservation created successfully",
        reservation,
    });
}));
exports.getAllReservations = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reservations = yield Reservation_1.default.find().populate("user").populate("seat").populate("schedule").populate("movie");
    if (reservations.length === 0) {
        return next(new Error_1.AppError("No reservations found", 404));
    }
    return res.status(200).json({
        message: "Reservations fetched successfully",
        totalCount: reservations.length,
        reservations,
    });
}));
exports.getReservationById = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError("Please provide reservation ID", 400));
    const reservation = yield Reservation_1.default.findById(id)
        .populate("user")
        .populate("seat")
        .populate("schedule")
        .populate("movie");
    if (!reservation) {
        return next(new Error_1.AppError("Reservation not found", 404));
    }
    return res.status(200).json({
        message: "Reservation fetched successfully",
        reservation,
    });
}));
exports.updatePaymentStatus = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isPaid } = req.body;
    if (!id)
        return next(new Error_1.AppError("Please provide reservation ID", 400));
    if (isPaid === undefined)
        return next(new Error_1.AppError("Please provide the payment status", 400));
    const reservation = yield Reservation_1.default.findByIdAndUpdate(id, { isPaid }, { new: true });
    if (!reservation) {
        return next(new Error_1.AppError("Reservation not found", 404));
    }
    return res.status(200).json({
        message: "Payment status updated successfully",
        reservation,
    });
}));
exports.deleteReservation = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError("Please provide reservation ID", 400));
    const reservation = yield Reservation_1.default.findByIdAndDelete(id);
    if (!reservation) {
        return next(new Error_1.AppError("Reservation not found", 404));
    }
    return res.status(200).json({
        message: "Reservation deleted successfully",
    });
}));
