import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  sender: "user" | "support";
  content: string;
  timestamp: Date;
}

export interface IChat extends Document {
  user: mongoose.Types.ObjectId;
  messages: IMessage[];
  status: "open" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: String, enum: ["user", "support"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema<IChat>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [messageSchema],
  status: { type: String, enum: ["open", "closed"], default: "open" },
}, { timestamps: true });

export default mongoose.model<IChat>("Chat", chatSchema);
