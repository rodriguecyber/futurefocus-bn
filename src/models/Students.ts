import { model, Schema } from "mongoose";
import { StudentTypes } from "../types/Types";

const StudentSchema  = new Schema<StudentTypes>({
  name: {type:String, required:true},
  email: {type:String, required:true},
  phone: {type:String, required:true},
  selectedCourse: {type:String, required:true},
  selectedShift: {type:String, required:true},
  message: {type:String, required:true} 
})
const Student = model<StudentTypes>("Student",StudentSchema)
export default Student