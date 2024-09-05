import { Request, Response } from "express";
import Student from "../models/Students";

export class StudentControllers {
  static apply = async (req: Request, res: Response) => {
    const studentData = req.body;
    try {
       const alreadyExist = await Student.findOne({email:studentData.email}) || await Student.findOne({phone:studentData.phone})
       if(alreadyExist){
        return res.status(400).json({message:"You have already applied "})
       }
      await Student.create(studentData);
      return res.status(200).json({ message: "Your apllication submitted" });
      
      
    } catch (error: any) {
      return res.status(500).json({ message: `failed to apply! try again` });
    }
  };

static students = async (req: Request, res: Response) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json(students);
  } catch (error: any) {
    res.status(500).json({ message: `Error ${error.message} occurred` });
  }
};
static delete = async (req:Request, res:Response)=>{
  const id=req.params.id;
  try {
    const student = await Student.findByIdAndDelete(id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });

  }
  res.status(200).json({message:"student deleted successfully"})
  } catch (error:any) {
    res.status(500).json({message:`Error ${error.message} occured`})
    
  }


}
}
