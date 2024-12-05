import express from 'express'
import * as P from './controller/payment.controller'
import protectedRoutes, { allowedTo } from '../../middlewares/authentication'

const paymentRouter = express.Router()

paymentRouter
.post("/",protectedRoutes,P.createPayment)

.get("/",protectedRoutes,P.getAllPayments)

.get("/:id",protectedRoutes,P.getPaymentById)

.put("/:id",protectedRoutes,allowedTo("admin"),P.updatePaymentStatus)

.delete("/:id",protectedRoutes,allowedTo("admin"),P.deletePayment)

export default paymentRouter