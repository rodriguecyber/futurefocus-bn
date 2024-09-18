import mongoose, { model, Schema } from "mongoose";
import { transactionTypes } from "../types/Types";

const transactionSchema = new Schema<transactionTypes>(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    amount: { type: Number, required: true },
    reason: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
const Transaction = model<transactionTypes>("Transaction", transactionSchema);
export default Transaction;
