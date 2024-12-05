import { AppError } from './../../../utils/Error';
import { Request, Response, NextFunction } from "express";
import Chat from "../../../../database/models/Chat";
import processMessage from "../../../utils/nlp";

export const startChat = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  if (!userId) return next(new AppError("User ID is required", 400));

  const chat = new Chat({ user: userId, messages: [] });
  await chat.save();

  res.status(201).json({ message: "Chat started", chat });
};

export const getChat = async (req: Request, res: Response, next: NextFunction) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId).populate({ path: 'user', select: 'name' })

  if (!chat) return next(new AppError("Chat not found", 404));

  res.status(200).json({ message: "Chat retrieved", chat });
};

export const handleUserMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { chatId, content } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new AppError("Chat not found", 404));

  const botResponse = processMessage(content);

  chat.messages.push({ sender: "user", content, timestamp: new Date() });
  chat.messages.push({ sender: "support", content: botResponse, timestamp: new Date() });
  await chat.save();

  res.status(200).json({ message: "Message processed", chat });
};
