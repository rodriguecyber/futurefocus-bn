import { model, Schema } from "mongoose";
import { CourseTypes } from "../types/Types";


const CourseSchema = new Schema<CourseTypes>({
 title:{type:String, required:true},
  image:{type:String, required:true},
  rating:{type:Number, default:0},
  order:{type:Number, required:true},
  active:{type:Boolean, default:true},
  shifts:{type:[Schema.Types.ObjectId], ref:"Shift",},
  scholarship:{type:Number,required:true},
  nonScholarship:{type:Number,required:true}
})
const Course = model<CourseTypes>("Course", CourseSchema)
export default Course