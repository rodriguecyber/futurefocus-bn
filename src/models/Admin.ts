import { model, Schema } from "mongoose";
import { AdminTypes } from "../types/Types";

const adminSchema = new Schema<AdminTypes>({
  email: {
    type: String,
    required: true,
    default: "rodrirwigara@gmail.com",
  },
  password: { type: String, required: true, default:"000000" },
});
const Admin = model<AdminTypes>("Admin",adminSchema)
export default Admin
