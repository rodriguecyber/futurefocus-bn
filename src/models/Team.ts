import { model, Schema } from "mongoose";
import {  TeamTypes } from "../types/Types";

const TeamSchema = new Schema<TeamTypes>({
  name:{type:String, required:true},
  active:{type:Boolean, default:true, required:true},
  image: {type:String,required:true},
  position:{type:String, required:true},
  email:{type:String, required:true},
  phone:{type:String},
  instagram:{type:String,require:true },
  password:{type:String,require:true, default:'00000000' },
  otp:{type:Schema.Types.Number,require:true, default:null },
  role:{type:Schema.Types.ObjectId,ref:'Role',},
  isAdmin:{type:Schema.Types.Boolean,default:false}

})
const Team = model<TeamTypes>("Team",TeamSchema)


const TeamAttendanceSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  timeOut:{type:Date},
  comment:{type:String},
  response:{type:String}, 
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