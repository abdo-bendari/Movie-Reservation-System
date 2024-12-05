import protectedRoutes, { allowedTo } from './../../middlewares/authentication';
import express from 'express';
import * as M from './controller/movie.controller';
const movieRouter = express.Router();

movieRouter
.post("/",protectedRoutes,allowedTo('admin'),M.addMovie)

.put("/:id",protectedRoutes,allowedTo('admin'),M.updateMovie)

.delete('/:id',protectedRoutes,allowedTo("admin"),M.deleteMovie)

.get("/",protectedRoutes,M.getAllMovies)

.get("/byActor",protectedRoutes,M.getMoviesByActor)

.get("/topRated",protectedRoutes,M.getTopRatedMovies)

.get("/search",protectedRoutes,M.getMovieByTitleOrId)

export default movieRouter;