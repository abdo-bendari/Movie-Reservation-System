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
exports.deletePayment = exports.updatePaymentStatus = exports.getPaymentById = exports.getAllPayments = exports.createPayment = void 0;
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Payment_1 = __importDefault(require("../../../../database/models/Payment"));
const stripe_1 = __importDefault(require("stripe"));
const Reservation_1 = __importDefault(require("../../../../database/models/Reservation"));
const stripeClient = new stripe_1.default("sk_test_51Q8k4oADDE4xwbMLuk629gfxCdDQUm45jsTiIFtMtGQlUvUK7kQe9fPwC8GbJh4gSy6c9Bk2P3BAOA7OYgEafJ9O00JKikJHjm");
exports.createPayment = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, reservation, amount, method } = req.body;
    if (!user || !reservation || !amount || !method) {
        return next(new Error_1.AppError("Please provide all required fields", 400));
    }
    // Ensure the reservation exists and belongs to the user
    const existingReservation = yield Reservation_1.default.findById(reservation);
    if (!existingReservation || existingReservation.user.toString() !== user) {
        return next(new Error_1.AppError("Invalid reservation or user mismatch", 404));
    }
    let transactionId;
    // Handle Stripe payment
    if (method === "Card") {
        try {
            const paymentIntent = yield stripeClient.paymentIntents.create({
                amount: amount * 100,
                currency: "usd",
                metadata: { reservationId: reservation, userId: user },
            });
            transactionId = paymentIntent.id;
        }
        catch (error) {
            return next(new Error_1.AppError("Card payment failed: ", 500));
        }
    }
    else if (method !== "Cash") {
        return next(new Error_1.AppError("Invalid payment method. Use 'Card' or 'Cash'.", 400));
    }
    const payment = new Payment_1.default({
        user,
        reservation,
        amount,
        method,
        status: method === "Cash" ? "Completed" : "Pending",
        transactionId,
    });
    yield payment.save();
    res.status(201).json({
        message: "Payment created successfully",
        payment,
    });
}));
exports.getAllPayments = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield Payment_1.default.find().populate("user reservation");
    if (payments.length === 0) {
        return res.status(404).json({ message: "No payments found" });
    }
    res.status(200).json({ message: "Success", total: payments.length, payments });
}));
exports.getPaymentById = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payment = yield Payment_1.default.findById(id).populate("user reservation");
    if (!payment) {
        return next(new Error_1.AppError("Payment not found", 404));
    }
    res.status(200).json({ message: "Success", payment });
}));
exports.updatePaymentStatus = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !["Pending", "Completed", "Failed"].includes(status)) {
        return next(new Error_1.AppError("Invalid or missing status", 400));
    }
    const payment = yield Payment_1.default.findByIdAndUpdate(id, { status }, { new: true });
    if (!payment) {
        return next(new Error_1.AppError("Payment not found", 404));
    }
    res.status(200).json({ message: "Payment status updated successfully", payment });
}));
exports.deletePayment = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payment = yield Payment_1.default.findByIdAndDelete(id);
    if (!payment) {
        return next(new Error_1.AppError("Payment not found", 404));
    }
    res.status(200).json({ message: "Payment deleted successfully" });
}));
