import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  reservation: mongoose.Types.ObjectId;
  amount: number;
  method: "Stripe" | "Cash";
  status: "Pending" | "Completed" | "Failed";
  transactionId?: string;
  paymentDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema<IPayment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    method: {
      type: String,
      enum: ["Card", "Cash"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    transactionId: { type: String },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
