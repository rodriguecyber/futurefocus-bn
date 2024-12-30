import { model, Schema } from "mongoose";
import { StudentTypes } from "../types/Types";

const StudentSchema = new Schema<StudentTypes>(
  {
    name: { type: String, required: false }, 
    email: { type: String, required: true, default: "academic@futurefocus.rw" }, 
    phone: { type: String, required: true },
    selectedCourse: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    selectedShift: { type: Schema.Types.ObjectId, ref: "Shift", required: true }, 
    intake: { type: String, required: true },
    message: { type: String, required: false }, 
    comment: { type: String, required: false }, 
    referer:{type:String, enum:['default','cyd'],default:"default"},
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "registered", "started", "completed", "droppedout"],
      default: "pending",
    },
  },
  {
    timestamps: true, 
    strict: true, 
  }
);


const Student = model<StudentTypes>("Student", StudentSchema);
export default Student;
