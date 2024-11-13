import { Request, Response } from "express";
import Payment from "../models/payment";
import Student from "../models/Students";

export const update1 = async(req:Request,res:Response)=>{
   try {
     // Find the last user added (sorted by createdAt field)
     const lastUser = await Student.findOneAndDelete().sort({ createdAt: -1 });

     if (!lastUser) {
       return res
         .status(404)
         .json({ message: "No users found in the database" });
     }

     // Delete the last user
     await Student.deleteOne({ _id: lastUser._id });

     res.status(200).json({ message: "Last user deleted successfully" });
   } catch (error) {
     res.status(500).json({ message: "Error deleting user", error });
   }
}