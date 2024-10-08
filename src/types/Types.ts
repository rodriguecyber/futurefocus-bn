import { Document, ObjectId, Schema } from "mongoose";

export interface AdminTypes extends Document {
  email: string;
  password: string;
 role:ObjectId
  name: string;
  OTP:number
}
export interface StudentTypes extends Document {
  name: string;
  email: string;
  phone: Number;
  selectedCourse: string;
  selectedShift: string;
  message: string;
  comment: string;
  status: string;
  intake: string;
}
export interface TeamTypes extends Document {
  name: string;
  image: string;
  role: string;
  email: string;
  instagram: string;
}
export interface ServiceTypes extends Document {
  title: string;
  subservices: string[];
  icon: string;
}

export interface CourseTypes extends Document {
  title: string;
  description: string;
  rating: number;
  image: string;
  scholarship: number;
  nonScholarship: number;
  shifts: string[];
}

export interface attendanceTypes {
  studentId: Schema.Types.ObjectId;
  status: string;
}
export interface paymentTypes {
  studentId: Schema.Types.ObjectId;
  status: string;
  amountDue: number;
  amountPaid: number;
  amountDiscounted:number
  extraAmount:number
  comment:string
}

export interface transactionTypes {
  studentId: Schema.Types.ObjectId;
  amount: number;
  reason: string;
}
export interface cashflowTypes {
  type: string;
  user: string;
  amount: number;
  reason: string;
  payment: string;
}
export interface RoleTypes {
  role: string;
  permission: ObjectId[];
}
export interface PermissionTypes {
  feature: ObjectId;
  permission: string;
}

