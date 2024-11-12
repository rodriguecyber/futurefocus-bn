import { model, Schema } from "mongoose";

const moduleSchema = new Schema({
  course: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: Number, default: 0 },
//   : { type: Boolean, default: true },
//   shifts: { type: [String], required: true },
//   scholarship: { type: Number, required: true },
//   nonScholarship: { type: Number, required: true },
});
const Module = model("Module", moduleSchema);
export default Module;
