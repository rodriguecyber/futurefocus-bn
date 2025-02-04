import mongoose, { model, Schema, Types } from "mongoose";
import { accesstypes } from "../types/Types";

const AccessSchema = new Schema<accesstypes>({
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required:true },
  duration: { type: Number, required: true, default:Date.now() },
  features:{type:[{active:{type:Boolean,default:false},feature:{type:Types.ObjectId},lastUpdated:{type:Date, required:false},dueDate:{type:Number,default:Date.now()}}], default:[],},
  active:{type:Boolean,required:true, default:false},
},{timestamps:true});
export const Access = model<accesstypes>("Access",AccessSchema)