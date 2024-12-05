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
exports.deleteSchedule = exports.updateSchedule = exports.getScheduleByMovieOrTheater = exports.getAllSchedules = exports.createSchedule = void 0;
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Schedule_1 = __importDefault(require("../../../../database/models/Schedule"));
exports.createSchedule = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { movie, theater, date, availableSeats, totalSeats } = req.body;
    if (!movie || !theater || !date || !availableSeats || !totalSeats) {
        return next(new Error_1.AppError("Please provide all necessary data", 400));
    }
    const schedule = new Schedule_1.default({
        movie,
        theater,
        date,
        availableSeats,
        totalSeats,
    });
    yield schedule.save();
    return res
        .status(201)
        .json({ message: "Schedule created successfully", schedule });
}));
exports.getAllSchedules = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schedules = yield Schedule_1.default.find()
        .populate("movie")
        .populate("theater");
    if (schedules.length === 0) {
        return next(new Error_1.AppError("No schedules found", 404));
    }
    return res.status(200).json({ message: "Success", schedules });
}));
exports.getScheduleByMovieOrTheater = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId, theaterId } = req.query;
    if (!movieId && !theaterId) {
        return next(new Error_1.AppError("Please provide movieId or theaterId", 400));
    }
    const filter = {};
    if (movieId)
        filter.movie = movieId;
    if (theaterId)
        filter.theater = theaterId;
    const schedules = yield Schedule_1.default.find(filter)
        .populate("movie")
        .populate("theater");
    if (schedules.length === 0) {
        return next(new Error_1.AppError("No schedules found", 404));
    }
    return res.status(200).json({ message: "Success", schedules });
}));
exports.updateSchedule = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError("Please provide schedule ID", 400));
    const { movie, theater, date, availableSeats, totalSeats } = req.body;
    const schedule = yield Schedule_1.default.findByIdAndUpdate(id, { movie, theater, date, availableSeats, totalSeats }, { new: true })
        .populate("movie")
        .populate("theater");
    if (!schedule) {
        return next(new Error_1.AppError("Schedule not found", 404));
    }
    return res
        .status(200)
        .json({ message: "Schedule updated successfully", schedule });
}));
exports.deleteSchedule = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError("Please provide schedule ID", 400));
    const schedule = yield Schedule_1.default.findByIdAndDelete(id);
    if (!schedule) {
        return next(new Error_1.AppError("Schedule not found", 404));
    }
    return res.status(200).json({ message: "Schedule deleted successfully" });
}));
