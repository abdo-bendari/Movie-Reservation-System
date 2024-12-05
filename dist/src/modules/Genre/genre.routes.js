"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importStar(require("../../middlewares/authentication"));
const G = __importStar(require("./controller/genre.controller"));
const genreRouter = express_1.default.Router();
genreRouter
    .post("/", authentication_1.default, (0, authentication_1.allowedTo)('admin'), G.addGenre)
    .get("/", authentication_1.default, G.getAllGenres)
    .get("/:id", authentication_1.default, G.getGenreById)
    .put("/:id", authentication_1.default, (0, authentication_1.allowedTo)('admin'), G.updateGenre)
    .delete('/:id', authentication_1.default, (0, authentication_1.allowedTo)("admin"), G.deleteGenre)
    .get("/:id/movie", authentication_1.default, G.getMoviesByGenre)
    .post("/:id/addMovie", authentication_1.default, (0, authentication_1.allowedTo)("admin"), G.addMovieToGenre);
exports.default = genreRouter;
