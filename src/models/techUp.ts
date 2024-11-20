import { model, Schema } from "mongoose";
// Define the Student schema
const techUpSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, default: "academic@futurefocus.rw" },
    phone: { type: String, required: true},
    gender: { type: String, },
  },
  {
    timestamps: true,
  }
);

const techUp = model("techup", techUpSchema);
export default techUp;
