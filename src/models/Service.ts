import { model, Schema } from "mongoose";
import { ServiceTypes } from "../types/Types";

const ServiceSchema= new Schema<ServiceTypes>({
  icon: { type: String, required: true },
  subservices:{type:[String], required:true},
  title:{type:String, required:true}

});
const Service = model<ServiceTypes>("Service", ServiceSchema )
export default Service
