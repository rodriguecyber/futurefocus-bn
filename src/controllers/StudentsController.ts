import { Request, Response } from "express";
import Student from "../models/Students";
import { StudentTypes } from "../types/Types";
import Transaction from "../models/Transaction";
import Payment from "../models/payment";
import Course from "../models/Course";


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
      return res.status(500).json({ message: `failed to apply! try again ${error.message}` });
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
static changeStatus = async (req:Request,res:Response)=>{
const id =  req.params.id
const {status} = req.body

try {
  const student = await Student.findById(id)
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  const course = await Course.findOne({title:student.selectedCourse})
if (!course) {
  return res.status(404).json({ message: "Course not found" });
}
  await Student.findByIdAndUpdate(id,{status:status})
  if (status === "registered"){
     await Transaction.create({
       studentId: student._id,
       amount: 100000,
       reason: "Registration fees",
     });
     await Payment.create({
      studentId:student._id,
      amountDue:course.scholarship
     })
  }
    res.status(200).json({ message: `student new status ${status}` });
} catch (error:any) {
  res.status(500).json({message:`${error.message} occured`})
  
}

}
static pay = async (req:Request, res:Response)=>{
 const {id }= req.params
 const  {amount,reason} = req.body

 try {
  const student =  await Student.findById(id)
  if(!student){
    return  res.status(404).json({message:"student not found"})
  }

  await Transaction.create({
    studentId: student._id,
    amount,
    reason: "scholl fees fees",
  });
 } catch (error:any) {
  res.status(500).json({message:`Error ${error.message} occured`})
 }


}
static registerNew = async (req:Request, res:Response)=>{
const student:StudentTypes = req.body
try {
 const course = await Course.findOne({ title: student.selectedCourse });
 if (!course) {
  return res.status(404).json({ message: "Course not found" });
  }
  const alreadyExist =await Student.findOne({ phone: student.phone });
  if (alreadyExist) {
    return res.status(400).json({ message: "You have already registered" });
  }
 const registerStudent = new Student(student)
 registerStudent.status = 'registered'
 await registerStudent.save()
 await Transaction.create({
  studentId:registerStudent._id,
  amount:100000,
  reason:"Registration fees"
 })
 
 await Payment.create({
  studentId:registerStudent._id,
  amountDue:course.nonScholarship
 })
 res.status(201).json({message:"new student registered"})
} catch (error:any) {
  res.status(500).json({message:`Error ${error.message} occured`})
}
}
}
