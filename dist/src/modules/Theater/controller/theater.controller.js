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
exports.getMoviesInTheater = exports.addMoviesToTheater = exports.deleteTheater = exports.updateTheater = exports.getTheaterById = exports.getAllTheaters = exports.addTheater = void 0;
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Theater_1 = __importDefault(require("../../../../database/models/Theater"));
exports.addTheater = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, totalSeats, availableSeats, movies } = req.body;
    if (!name || !location || !totalSeats) {
        return next(new Error_1.AppError("Please provide all required fields", 400));
    }
    const theater = new Theater_1.default({
        name,
        location,
        totalSeats,
        availableSeats: availableSeats || totalSeats,
        movies,
    });
    yield theater.save();
    return res.status(201).json({
        message: "Theater added successfully",
        theater,
    });
}));
exports.getAllTheaters = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.query;
    const query = city ? { "location.city": city } : {};
    const theaters = yield Theater_1.default.find(query);
    if (!theaters.length) {
        return next(new Error_1.AppError("No theaters found", 404));
    }
    return res.status(200).json({
        message: "Success",
        totalCount: theaters.length,
        theaters,
    });
}));
exports.getTheaterById = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const theater = yield Theater_1.default.findById(id);
    if (!theater) {
        return next(new Error_1.AppError("Theater not found", 404));
    }
    return res.status(200).json({
        message: "Success",
        theater,
    });
}));
exports.updateTheater = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const theater = yield Theater_1.default.findByIdAndUpdate(id, updateData, { new: true });
    if (!theater) {
        return next(new Error_1.AppError("Theater not found", 404));
    }
    return res.status(200).json({
        message: "Theater updated successfully",
        theater,
    });
}));
exports.deleteTheater = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const theater = yield Theater_1.default.findByIdAndDelete(id);
    if (!theater) {
        return next(new Error_1.AppError("Theater not found", 404));
    }
    return res.status(200).json({
        message: "Theater deleted successfully",
    });
}));
exports.addMoviesToTheater = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { movies } = req.body;
    if (!movies || !Array.isArray(movies)) {
        return next(new Error_1.AppError("Please provide a valid list of movie IDs", 400));
    }
    const theater = yield Theater_1.default.findByIdAndUpdate(id, { $addToSet: { movies: { $each: movies } } }, { new: true });
    if (!theater) {
        return next(new Error_1.AppError("Theater not found", 404));
    }
    return res.status(200).json({
        message: "Movies added to theater successfully",
        theater,
    });
}));
exports.getMoviesInTheater = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const theater = yield Theater_1.default.findById(id).populate("movies");
    if (!theater) {
        return next(new Error_1.AppError("Theater not found", 404));
    }
    return res.status(200).json({
        message: "Success",
        movies: theater.movies,
    });
}));
