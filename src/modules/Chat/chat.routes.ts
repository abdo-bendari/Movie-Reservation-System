import express from 'express';
import { getChat, handleUserMessage, startChat } from './controller/chat.controller';

const chatRouter = express.Router();
chatRouter
.post("/start", startChat)
.get("/:chatId",getChat)
.post("/message", handleUserMessage);
export default chatRouter;