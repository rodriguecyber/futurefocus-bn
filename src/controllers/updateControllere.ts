import { Request, Response } from "express";
import { sendMessage } from "../utils/sendSms";
import Student from "../models/Students";

export const testController = async (req: Request, res: Response) => {
  try {
   // Assuming the collection is called 'students'
  const stu  = await Student.find(
  {}, // Query to select any student (you can add a filter here if needed)
  {
    skip: 1115,  // Skip the first 1019 students
    limit: 100,    // Get only the 1020th student
    // sort: { _id: 1 } // Optional: sort by _id or any other field you want
    
  }
)

res.status(200).json(stu);

  } catch (error) {
    res.status(500).json(error);
  }
};
    