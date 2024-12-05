import express from 'express'
import protectedRoutes, { allowedTo } from '../../middlewares/authentication';
import * as SE from './controller/seat.controller';

const seatRouter = express.Router()
seatRouter
.post("/",protectedRoutes,allowedTo("admin"),SE.addSeat)

.get("/", protectedRoutes, SE.getAllSeats)

.get("/search",protectedRoutes, SE.getSeatByIdOrNumber)

.put("/:id",protectedRoutes,allowedTo("admin"),SE.updateSeatStatus )

.delete("/:id", protectedRoutes,allowedTo("admin"),SE.deleteSeat);

export default seatRouter