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
exports.getTopRatedMovies = exports.getMoviesByActor = exports.deleteMovie = exports.updateMovie = exports.getMovieByTitleOrId = exports.getAllMovies = exports.addMovie = void 0;
const Error_1 = require("./../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Movie_1 = __importDefault(require("../../../../database/models/Movie"));
exports.addMovie = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, releaseDate, duration, genres, actors, director, imageUrl, schedule, reservations, reviews, ratings } = req.body;
    if (!title || !description || !releaseDate || !duration || !genres || !actors || !director) {
        return next(new Error_1.AppError("Please provide all data", 400));
    }
    const movie = new Movie_1.default({
        title,
        description,
        releaseDate,
        duration,
        genres,
        actors,
        director,
        imageUrl,
        schedule,
        reservations,
        reviews,
        ratings
    });
    yield movie.save();
    return res.status(201).json({ message: "New movie added successfully", movie });
}));
exports.getAllMovies = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield Movie_1.default.find();
    return movies.length === 0
        ? next(new Error_1.AppError('No movies found', 404))
        : res.status(200).json({ message: 'Success', totalCount: movies.length, movies });
}));
exports.getMovieByTitleOrId = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, id } = req.query;
    if (!title && !id) {
        return next(new Error_1.AppError('Please provide title or id', 400));
    }
    const movie = yield Movie_1.default.findOne({ $or: [{ title: title }, { _id: id }] });
    if (!movie) {
        return next(new Error_1.AppError('Movie not found', 404));
    }
    return res.status(200).json({ message: 'Success', movie });
}));
exports.updateMovie = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next(new Error_1.AppError('Please provide id', 400));
    }
    const { title, description, releaseDate, duration, genres, actors, director, imageUrl, schedule } = req.body;
    const movie = yield Movie_1.default.findByIdAndUpdate(id, { title, description, releaseDate, duration, genres, actors, director, imageUrl, schedule }, { new: true });
    if (!movie) {
        return next(new Error_1.AppError('Movie not found', 404));
    }
    return res.status(200).json({ message: 'Movie updated successfully', movie });
}));
exports.deleteMovie = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next(new Error_1.AppError('Please provide id', 400));
    }
    const movie = yield Movie_1.default.findByIdAndDelete(id);
    if (!movie) {
        return next(new Error_1.AppError('Movie not found', 404));
    }
    return res.status(200).json({ message: 'Movie deleted successfully' });
}));
exports.getMoviesByActor = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { actor } = req.query;
    if (!actor) {
        return next(new Error_1.AppError('Please provide actor name', 400));
    }
    const movies = yield Movie_1.default.find({ actors: { $in: [actor] } });
    if (movies.length === 0) {
        return next(new Error_1.AppError('No movies found for this actor', 404));
    }
    return res.status(200).json({ message: 'Success', movies });
}));
exports.getTopRatedMovies = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield Movie_1.default.find().sort({ ratings: -1 }).limit(5);
    if (movies.length === 0) {
        return next(new Error_1.AppError('No top-rated movies found', 404));
    }
    return res.status(200).json({ message: 'Success', movies });
}));
