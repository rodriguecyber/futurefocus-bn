import { model, Schema } from "mongoose";
import {  TeamTypes } from "../types/Types";

const TeamSchema = new Schema<TeamTypes>({
  name:{type:String, required:true},
  image: {type:String,required:true},
  role:{type:String, required:true},
  email:{type:String, required:true},
  instagram:{type:String,require:true },
  password:{type:String,require:true, default:'00000000' }
})
const Team = model<TeamTypes>("Team",TeamSchema)


const TeamAttendanceSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  timeOut:{type:Date},
  status: {
    type: String,
    enum: ["absent","pending", "present"],
    required: true,
    default: "absent",
  },
},{
  timestamps:true
});
export const TeamAttendandance = model("TeamAttendance",TeamAttendanceSchema)
export default Team