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
const Chat_1 = __importDefault(require("../../database/models/Chat"));
const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        socket.on("joinChat", (chatId) => __awaiter(void 0, void 0, void 0, function* () {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        }));
        socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ chatId, sender, content }) {
            const chat = yield Chat_1.default.findById(chatId);
            if (!chat)
                return socket.emit("error", "Chat not found");
            chat.messages.push({ sender, content, timestamp: new Date() });
            yield chat.save();
            io.to(chatId).emit("newMessage", { sender, content, timestamp: new Date() });
        }));
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};
exports.default = chatSocket;
