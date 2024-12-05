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
exports.deleteSeat = exports.updateSeatStatus = exports.getSeatByIdOrNumber = exports.getAllSeats = exports.addSeat = void 0;
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Seat_1 = __importDefault(require("../../../../database/models/Seat"));
exports.addSeat = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { schedule, theater, seatNumber, user } = req.body;
    if (!schedule || !theater || !seatNumber) {
        return next(new Error_1.AppError("Please provide all required data (schedule, theater, seatNumber)", 400));
    }
    const seat = new Seat_1.default({
        schedule,
        theater,
        seatNumber,
        isAvailable: true,
        user
    });
    yield seat.save();
    return res.status(201).json({ message: "Seat added successfully", seat });
}));
exports.getAllSeats = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const seats = yield Seat_1.default.find();
    if (seats.length === 0) {
        return next(new Error_1.AppError("No seats found", 404));
    }
    return res.status(200).json({ message: "Seats retrieved successfully", seats });
}));
exports.getSeatByIdOrNumber = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, seatNumber } = req.query;
    if (!id && !seatNumber) {
        return next(new Error_1.AppError("Please provide either seat ID or seat number", 400));
    }
    const seat = yield Seat_1.default.findOne({
        $or: [{ _id: id }, { seatNumber: seatNumber }],
    }).populate('schedule').populate('user');
    if (!seat) {
        return next(new Error_1.AppError("Seat not found", 404));
    }
    return res.status(200).json({ message: "Seat retrieved successfully", seat });
}));
exports.updateSeatStatus = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isAvailable } = req.body;
    if (!id || (isAvailable === undefined)) {
        return next(new Error_1.AppError("Please provide seat ID and availability status", 400));
    }
    const seat = yield Seat_1.default.findByIdAndUpdate(id, { isAvailable }, { new: true });
    if (!seat) {
        return next(new Error_1.AppError("Seat not found", 404));
    }
    return res.status(200).json({ message: "Seat status updated successfully", seat });
}));
exports.deleteSeat = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next(new Error_1.AppError("Please provide seat ID", 400));
    }
    const seat = yield Seat_1.default.findByIdAndDelete(id);
    if (!seat) {
        return next(new Error_1.AppError("Seat not found", 404));
    }
    return res.status(200).json({ message: "Seat deleted successfully" });
}));
