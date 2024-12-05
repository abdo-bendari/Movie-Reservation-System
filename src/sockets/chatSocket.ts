import { Server, Socket } from "socket.io";
import Chat from "../../database/models/Chat";


const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinChat", async (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on("sendMessage", async ({ chatId, sender, content }) => {
      const chat = await Chat.findById(chatId);
      if (!chat) return socket.emit("error", "Chat not found");

      chat.messages.push({ sender, content, timestamp: new Date() });
      await chat.save();

      io.to(chatId).emit("newMessage", { sender, content, timestamp: new Date() });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default chatSocket;
