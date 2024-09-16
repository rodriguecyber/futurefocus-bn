import mongoose, { model, Schema } from "mongoose";
import { paymentTypes } from "../types/Types";

const paymentSchema = new Schema<paymentTypes>(
  {
    studentId:{type:mongoose.Types.ObjectId, required:true},
    status:{type:String, enum:['paid','unpaid','partial','overpaid'], default:"unpaid", required:true},
    amountDue:{type:Number,required:true},
    amountPaid:{type:Number, default:0, required:true}
    
  },
  {
    timestamps: true,
  }
);
const Payment = model<paymentTypes>("payment", paymentSchema);
export default Payment;
