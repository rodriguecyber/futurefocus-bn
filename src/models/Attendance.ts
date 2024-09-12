import mongoose, { mongo, Schema } from "mongoose";
import { attendanceTypes } from "../types/Types";

const AttendanceSchema =  new Schema<attendanceTypes>({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required:true },
    status:{type:String, enum:['absent','late','present'] , required:true}

})
export const Attendance = mongoose.model('attendrecord',AttendanceSchema)