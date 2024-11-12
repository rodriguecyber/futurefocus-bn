import { model, Schema } from "mongoose";
// Define the Student schema
const onlineStudentSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, },
    password: { type: String, required: true, default:'00000000' },
    phone: { type: String, required: true },
    otp: { type: Number, required: true, default:null },
    selectedCourse: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    intake: { type: Schema.Types.ObjectId, required: true, ref: "Intake" },
    profile: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: [
        "registered",
        "started",
        "completed",
        "droppedout",
      ],
      default: "registred",
    },
  },
  {
    timestamps: true,
  }
);

const OnlineStudent = model("OnlineStudent", onlineStudentSchema);
export default OnlineStudent;
