import express from 'express';
import protectedRoutes, { allowedTo } from '../../middlewares/authentication';
import * as G from './controller/genre.controller';


const genreRouter = express.Router();

genreRouter

.post("/",protectedRoutes,allowedTo('admin'),G.addGenre)

.get("/",protectedRoutes,G.getAllGenres)

.get("/:id",protectedRoutes,G.getGenreById)

.put("/:id",protectedRoutes,allowedTo('admin'),G.updateGenre)

.delete('/:id',protectedRoutes,allowedTo("admin"),G.deleteGenre)

.get("/:id/movie",protectedRoutes,G.getMoviesByGenre)

.post("/:id/addMovie",protectedRoutes,allowedTo("admin"),G.addMovieToGenre)


export default genreRouter;