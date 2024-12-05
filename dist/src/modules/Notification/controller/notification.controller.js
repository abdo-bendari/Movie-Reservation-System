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
exports.deleteAllNotificationsForUser = exports.markNotificationAsRead = exports.createNotification = void 0;
const Notification_1 = __importDefault(require("../../../../database/models/Notification"));
const sendEmail_1 = __importDefault(require("../../../utils/sendEmail"));
const catchError_1 = __importDefault(require("../../../middlewares/catchError"));
const Error_1 = require("../../../utils/Error");
exports.createNotification = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, title, message, type, email } = req.body;
    if (!user || !title || !message || !type) {
        return next(new Error_1.AppError("Please provide all required fields", 400));
    }
    const notification = new Notification_1.default({
        user,
        title,
        message,
        type,
        email,
    });
    yield notification.save();
    // Send email notification if type is 'email'
    if (type === "email" && email) {
        try {
            yield (0, sendEmail_1.default)({
                to: email,
                subject: title,
                text: message,
            });
            console.log("Email sent successfully");
        }
        catch (error) {
            return next(new Error_1.AppError("Failed to send email notification", 500));
        }
    }
    return res.status(201).json({ message: "Notification created successfully", notification });
}));
exports.markNotificationAsRead = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const notification = yield Notification_1.default.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!notification) {
        return next(new Error_1.AppError("Notification not found", 404));
    }
    return res.status(200).json({
        message: "Notification marked as read",
        notification,
    });
}));
exports.deleteAllNotificationsForUser = (0, catchError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const notifications = yield Notification_1.default.deleteMany({ user: id });
    return res.status(200).json({
        message: `All notifications deleted successfully for user ${id}`,
        deletedCount: notifications.deletedCount,
    });
}));
