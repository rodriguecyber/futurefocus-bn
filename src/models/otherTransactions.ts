import mongoose, { model, Schema } from "mongoose";
import { cashflowTypes, paymentTypes } from "../types/Types";

const CashflowSchema = new Schema<cashflowTypes>(
  {
    user: {
      type: String,

      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reason:{type:String, required:true},
    payment: { type: String, default: "Cash", required: true },
    type: { type: String, required: true, enum: ["income", "expenses"] },
  },
  {
    timestamps: true,
  }
);
const Cashflow = model<cashflowTypes>("Cashflow", CashflowSchema);
export default Cashflow;
