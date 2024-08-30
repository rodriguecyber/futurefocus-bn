import { Request, Response } from "express";
import Student from "../models/Students";

export class StudentControllers {
  static apply = async (req: Request, res: Response) => {
    const studentData = req.body;
    try {
      await Student.create(studentData);
      return res.status(200).json({ message: "Your apllication submitted" });
      
    } catch (error: any) {
      return res.status(500).json({ messge: `Error ${error.message} Occured` });
    }
  };
  static students = async (req: Request, res: Response) => {
    try {
      const students = await Student.find();
      return res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
}
