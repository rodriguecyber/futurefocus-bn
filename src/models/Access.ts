import mongoose, { model, Schema } from "mongoose";
import { accesstypes } from "../types/Types";

const AccessSchema = new Schema<accesstypes>({
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required:true },
  duration: { type: Number, required: true, default:0 },
  features:{type:[mongoose.Schema.Types.ObjectId]},
  active:{type:Boolean,required:true, default:false},
},{timestamps:true});
export const Access = model<accesstypes>("Access",AccessSchema)