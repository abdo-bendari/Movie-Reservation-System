"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./../utils/Error");
const globalError_1 = __importDefault(require("../middlewares/globalError"));
const express_1 = __importDefault(require("express"));
const movie_routes_1 = __importDefault(require("./Movie/movie.routes"));
const auth_routes_1 = __importDefault(require("./Auth/auth.routes"));
const genre_routes_1 = __importDefault(require("./Genre/genre.routes"));
const theater_routes_1 = __importDefault(require("./Theater/theater.routes"));
const schedule_routes_1 = __importDefault(require("./Schedule/schedule.routes"));
const seat_routes_1 = __importDefault(require("./Seat/seat.routes"));
const reservation_routes_1 = __importDefault(require("./Reservation/reservation.routes"));
const ticket_routes_1 = __importDefault(require("./Ticket/ticket.routes"));
const payment_routes_1 = __importDefault(require("./Payment/payment.routes"));
const review_routes_1 = __importDefault(require("./Review/review.routes"));
const notification_routes_1 = __importDefault(require("./Notification/notification.routes"));
const chat_routes_1 = __importDefault(require("./Chat/chat.routes"));
const bootstrap = (app) => {
    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
    });
    app.use(express_1.default.json());
    const baseUrl = "/api/v1";
    // Uncomment these routes once you have the routers ready
    app.use(`${baseUrl}/movies`, movie_routes_1.default);
    app.use(`${baseUrl}/auth`, auth_routes_1.default);
    app.use(`${baseUrl}/genres`, genre_routes_1.default);
    app.use(`${baseUrl}/theaters`, theater_routes_1.default);
    app.use(`${baseUrl}/schedules`, schedule_routes_1.default);
    app.use(`${baseUrl}/seats`, seat_routes_1.default);
    app.use(`${baseUrl}/reservations`, reservation_routes_1.default);
    app.use(`${baseUrl}/tickets`, ticket_routes_1.default);
    app.use(`${baseUrl}/payments`, payment_routes_1.default);
    app.use(`${baseUrl}/reviews`, review_routes_1.default);
    app.use(`${baseUrl}/notifications`, notification_routes_1.default);
    app.use(`${baseUrl}/chats`, chat_routes_1.default);
    app.use("*", (req, res, next) => {
        next(new Error_1.AppError("Route not found", 404));
    });
    process.on("unhandledRejection", (err) => {
        console.error("Unhandled Rejection:", err);
    });
    app.use(globalError_1.default);
};
exports.default = bootstrap;
