import express from 'express';
import protectedRoutes, { allowedTo } from '../../middlewares/authentication';
import * as R from './controller/reservation.controller';

const reservationRouter = express.Router();

reservationRouter.use(protectedRoutes,allowedTo("admin"));
 reservationRouter 
.post("/",R.createReservation)

.get("/",R.getAllReservations)

.get("/:id",R.getReservationById)

.put("/:id",R.updatePaymentStatus )

.delete("/:id",R.deleteReservation);

export default reservationRouter;
