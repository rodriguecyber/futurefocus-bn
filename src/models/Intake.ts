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

interface IShift {
  days:string
  name:string
  start: String;
  end: String;
}
const ShiftSchema = new Schema<IShift>(
  {  
    name:{type:String,required:true},
    days:{type:String,required:true},
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const Shift = model<IShift>("shift", ShiftSchema);
