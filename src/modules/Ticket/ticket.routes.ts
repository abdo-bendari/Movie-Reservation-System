import express from "express"
import protectedRoutes, { allowedTo } from "../../middlewares/authentication";
import * as Tc from "./controller/ticket.controller";

const ticketRouter = express.Router()

ticketRouter.use(protectedRoutes,allowedTo("admin"));
ticketRouter 
.post("/",Tc.createTicket)

.get("/",Tc.getAllTickets)

.get("/:id",Tc.getTicketById)

.get("/user/:userId",Tc.getTicketsByUser)

.get("/reservation/:reservationId",Tc.getTicketsByReservation)

.put("/:id",Tc.updateTicket )

.delete("/:id",Tc.deleteTicket)

.patch("/:id/cancel",Tc.cancelTicket)

.get("/all/active",Tc.getActiveTickets)

.get("/all/cancelled",Tc.getCancelledTickets);


export default ticketRouter;