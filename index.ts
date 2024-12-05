import express from "express";
import { Express } from "express";
import { dbConnection } from "./database/dbConnection";
import cors from "cors";
import morgan from "morgan";
import bootstrap from "./src/modules/bootstrap";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import processMessage from "./src/utils/nlp";

dotenv.config();
const app: Express = express();
const httpServer = createServer(app); 
const io = new Server(httpServer, {
  cors: {
    origin: "*", 
  },
});

dbConnection();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
bootstrap(app);

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("message", (msg: string) => {
    console.log(`Received message: ${msg}`);
    const response = processMessage(msg);
    socket.emit("response", response); 
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

