import { Document } from "mongoose";

export interface AdminTypes extends Document {
    email:string,
    password:string
}
export interface StudentTypes extends Document {
  name: string;
  email: string;
  phone: Number;
  selectedCourse: string;
  selectedShift: string;
  message: string;
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
}

