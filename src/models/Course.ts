import { model, Schema } from "mongoose";
import { CourseTypes } from "../types/Types";

const CourseSchema = new Schema<CourseTypes>({
 title:{type:String, required:true},
  image:{type:String, required:true},
  rating:{type:Number, default:0},
})
const Course = model<CourseTypes>("Course", CourseSchema)
export default Course