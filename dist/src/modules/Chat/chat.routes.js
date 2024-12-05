"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("./controller/chat.controller");
const chatRouter = express_1.default.Router();
chatRouter
    .post("/start", chat_controller_1.startChat)
    .get("/:chatId", chat_controller_1.getChat)
    .post("/message", chat_controller_1.handleUserMessage);
exports.default = chatRouter;
