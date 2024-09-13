import mongoose, { model, Schema } from "mongoose";

   
interface IIntake{
    intake:string
}
   const IntakeSchema = new Schema<IIntake>({
     intake:"string",
   },
   {
    timestamps:true
   }
)
   const Intake = model<IIntake>("intake",IntakeSchema)
   export default Intake