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
exports.handleUserMessage = exports.getChat = exports.startChat = void 0;
const Error_1 = require("./../../../utils/Error");
const Chat_1 = __importDefault(require("../../../../database/models/Chat"));
const nlp_1 = __importDefault(require("../../../utils/nlp"));
const startChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId)
        return next(new Error_1.AppError("User ID is required", 400));
    const chat = new Chat_1.default({ user: userId, messages: [] });
    yield chat.save();
    res.status(201).json({ message: "Chat started", chat });
});
exports.startChat = startChat;
const getChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const chat = yield Chat_1.default.findById(chatId).populate({ path: 'user', select: 'name' });
    if (!chat)
        return next(new Error_1.AppError("Chat not found", 404));
    res.status(200).json({ message: "Chat retrieved", chat });
});
exports.getChat = getChat;
const handleUserMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, content } = req.body;
    const chat = yield Chat_1.default.findById(chatId);
    if (!chat)
        return next(new Error_1.AppError("Chat not found", 404));
    const botResponse = (0, nlp_1.default)(content);
    chat.messages.push({ sender: "user", content, timestamp: new Date() });
    chat.messages.push({ sender: "support", content: botResponse, timestamp: new Date() });
    yield chat.save();
    res.status(200).json({ message: "Message processed", chat });
});
exports.handleUserMessage = handleUserMessage;
