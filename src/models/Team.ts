import { model, Schema } from "mongoose";
import {  TeamTypes } from "../types/Types";

const TeamSchema = new Schema<TeamTypes>({
  name:{type:String, required:true},
  image: {type:String,required:true},
  role:{type:String, required:true},
  email:{type:String, required:true},
  instagram:{type:String,require:true }
})
const Team = model<TeamTypes>("Team",TeamSchema)
export default Team