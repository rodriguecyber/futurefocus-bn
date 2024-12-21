import { model, Schema } from "mongoose";
import { StudentTypes } from "../types/Types";

// Define the Student schema
const StudentSchema = new Schema<StudentTypes>(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, default: "academic@futurefocus.rw" },
    phone: { type: String, required: true },
    selectedCourse: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    selectedShift: { type: Schema.Types.ObjectId, ref: "shift", required: true },
    intake: { type: String, required: true },
    message: { type: String, required: false },
    comment: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "accepted",
        "registered",
        "started",
        "completed",
        "droppedout",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
    strict: false, // Allow extra fields not defined in the schema
  }
);

// Disable validation globally during query (this helps allow retrieval of invalid BSON)
StudentSchema.set('strictQuery', false);

const Student = model<StudentTypes>("Student", StudentSchema);
export default Student;
