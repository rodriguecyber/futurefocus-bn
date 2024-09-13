import { Document, Schema } from "mongoose";

export interface AdminTypes extends Document {
    email:string,
    password:string,
    isSuperAdmin:Boolean
}
export interface StudentTypes extends Document {
  name: string;
  email: string;
  phone: Number;
  selectedCourse: string;
  selectedShift: string;
  message: string;
  status:string
  intake:string
}
export interface TeamTypes extends Document {
  name: string;
  image: string;
  role: string;
  email:string,
  instagram:string
}
export interface ServiceTypes extends Document {
  title: string;
  subservices: string[];
  icon:string,
  
}

export interface  CourseTypes extends Document {
  title: string;
  description: string;
  rating: number;
  image: string;
  scholarship:number
  nonScholarship:number
  shifts:string[],
}

export interface attendanceTypes{
  studentId:Schema.Types.ObjectId,
  status:string,
}
export interface paymentTypes{
  studentId:Schema.Types.ObjectId,
  status:string,
  amountDue:number,
  amountPaid:number,

}
export interface transactionTypes{
  studentId:Schema.Types.ObjectId,
  amount:number,
  reason:string
}
