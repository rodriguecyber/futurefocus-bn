import { model, Schema } from "mongoose";
import { StudentTypes } from "../types/Types";

// Define the Student schema
const techUpSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, default: "academic@futurefocus.rw" },
    phone: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const techUp = model("techup", techUpSchema);
export default techUp;
