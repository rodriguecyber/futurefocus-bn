import mongoose, {Schema } from "mongoose";
import { attendanceTypes } from "../types/Types";

const AttendanceSchema =  new Schema<attendanceTypes>({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required:true },
    status:{type:String, enum:['absent','present'] , required:true, default:"absent"},
   

},
{
    timestamps:true
})

export const Attendance = mongoose.model('StudentAttendance',AttendanceSchema)