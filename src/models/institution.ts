import { model, Schema } from "mongoose";
import { InstitutionTypes } from "../types/Types";

const InstitutionSchema = new Schema<InstitutionTypes>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  logo:{type:String,required:true},
  verified:{type:Boolean,required:true, default:false}
},{timestamps:true});
export const Institution = model<InstitutionTypes>("Institution",InstitutionSchema)