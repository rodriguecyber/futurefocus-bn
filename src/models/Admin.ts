import { model, Schema } from "mongoose";
import { AdminTypes } from "../types/Types";

const adminSchema = new Schema<AdminTypes>({
  name:{
    type:String, required:true
  },
  email: {
    type: String,
    required: true,
    
  },
  OTP:{
    type:Number,

  },
  password: { type: String, required: true, default:"000000" },
  role: { type: Schema.Types.ObjectId, ref:"Role", },
  
});
const Admin = model<AdminTypes>("Admin",adminSchema)
export default Admin
