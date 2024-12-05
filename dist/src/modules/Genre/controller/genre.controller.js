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
exports.addMovieToGenre = exports.getMoviesByGenre = exports.deleteGenre = exports.updateGenre = exports.getGenreById = exports.getAllGenres = exports.addGenre = void 0;
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Genre_1 = __importDefault(require("../../../../database/models/Genre"));
exports.addGenre = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, movies } = req.body;
    if (!name) {
        return next(new Error_1.AppError("Please provide the name of the genre", 400));
    }
    const genre = new Genre_1.default({
        name,
        description,
        movies
    });
    yield genre.save();
    res.status(201).json({
        message: "Genre created successfully",
        genre,
    });
}));
exports.getAllGenres = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield Genre_1.default.find();
    if (genres.length === 0) {
        return next(new Error_1.AppError("No genres found", 404));
    }
    res.status(200).json({
        message: "Genres retrieved successfully",
        totalCount: genres.length,
        genres,
    });
}));
exports.getGenreById = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next(new Error_1.AppError("Please provide the ID of the genre", 400));
    }
    const genre = yield Genre_1.default.findById(id).populate("movies");
    if (!genre) {
        return next(new Error_1.AppError("Genre not found", 404));
    }
    res.status(200).json({
        message: "Genre retrieved successfully",
        genre,
    });
}));
exports.updateGenre = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id) {
        return next(new Error_1.AppError("Please provide the ID of the genre", 400));
    }
    const genre = yield Genre_1.default.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!genre) {
        return next(new Error_1.AppError("Genre not found", 404));
    }
    res.status(200).json({
        message: "Genre updated successfully",
        genre,
    });
}));
exports.deleteGenre = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next(new Error_1.AppError("Please provide the ID of the genre", 400));
    }
    const genre = yield Genre_1.default.findByIdAndDelete(id);
    if (!genre) {
        return next(new Error_1.AppError("Genre not found", 404));
    }
    res.status(200).json({
        message: "Genre deleted successfully",
    });
}));
exports.getMoviesByGenre = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return next(new Error_1.AppError("Please provide the ID of the genre", 400));
    }
    const genre = yield Genre_1.default.findById(id).populate("movies");
    if (!genre) {
        return next(new Error_1.AppError("Genre not found", 404));
    }
    res.status(200).json({
        message: "Movies retrieved successfully",
        movies: genre.movies,
    });
}));
exports.addMovieToGenre = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { movieId } = req.body;
    if (!id || !movieId) {
        return next(new Error_1.AppError("Please provide the genre ID and movie ID", 400));
    }
    const genre = yield Genre_1.default.findById(id);
    if (!genre) {
        return next(new Error_1.AppError("Genre not found", 404));
    }
    if (!genre.movies.includes(movieId)) {
        genre.movies.push(movieId);
        yield genre.save();
    }
    res.status(200).json({
        message: "Movie added to genre successfully",
        genre,
    });
}));
