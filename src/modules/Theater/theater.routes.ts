import express from "express"
import * as T from "./controller/theater.controller";
import protectedRoutes, { allowedTo } from "../../middlewares/authentication";


const theaterRouter = express.Router()

theaterRouter
.post("/",protectedRoutes,allowedTo('admin'),T.addTheater)

.put("/:id",protectedRoutes,allowedTo('admin'),T.updateTheater)

.delete('/:id',protectedRoutes,allowedTo("admin"),T.deleteTheater)

.get("/",protectedRoutes,T.getAllTheaters)

.get("/:id",protectedRoutes,T.getTheaterById)

.post("/:id/addMovie",protectedRoutes,allowedTo('admin'),T.addMoviesToTheater)

.get("/:id/theaterMovies",protectedRoutes,T.getMoviesInTheater)


export default theaterRouter;