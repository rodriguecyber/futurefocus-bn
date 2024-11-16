import { model, Schema } from "mongoose";

interface IIntake {
  intake: string;
}
const IntakeSchema = new Schema<IIntake>(
  {
    intake: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Intake = model<IIntake>("intake", IntakeSchema);
export default Intake;

// shift model
interface IShift {
  shift: string;
  start: Date;
  end: Date;
}
const ShiftSchema = new Schema<IShift>(
  {
    shift: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
export const Shift = model<IShift>("shift", ShiftSchema);
