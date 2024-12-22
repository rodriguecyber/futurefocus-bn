import { model, Schema } from "mongoose";
import { StudentTypes } from "../types/Types";

// Define the Student schema
const StudentSchema = new Schema<StudentTypes>(
  {
    name: { type: String, required: false }, // Optional field
    email: { type: String, required: true, default: "academic@futurefocus.rw" }, // Default email value
    phone: { type: String, required: true },
    selectedCourse: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    selectedShift: { type: Schema.Types.ObjectId, ref: "Shift", required: true }, // Adjusted collection name to match
    intake: { type: String, required: true },
    message: { type: String, required: false }, // Optional field
    comment: { type: String, required: false }, // Optional field
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "registered", "started", "completed", "droppedout"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    strict: true, // Ensures only the defined fields are allowed
  }
);

// Disable global strict query validation if absolutely necessary
// StudentSchema.set('strictQuery', false); // Uncomment only if absolutely necessary

const Student = model<StudentTypes>("Student", StudentSchema);
export default Student;
