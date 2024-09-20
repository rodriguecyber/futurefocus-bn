import cron from "node-cron";
import Student from "../models/Students";
import { Attendance } from "../models/Attendance";
import { Request, Response } from "express";

export const dailyAttendance = () => {
  cron.schedule("0 12 * * *", async () => {
    try {
      const students = await Student.find({ status: "started" });
      for (const student of students) {
        await Attendance.create({
          studentId: student._id,
        });
      }
      console.log("Attendance created");
    } catch (error) {
      console.error("Error in dailyAttendance:", error);
    }
  });
};

export const dropout = () => {
  cron.schedule("0 8 * * *", async () => {
    try {
      const students = await Student.find({ status: "started" });
      for (const student of students) {
        const absences = await Attendance.countDocuments({
          studentId: student._id,
          status: "absent",
        });
        if (absences > 14) {
          student.status = "droppedout";
          await student.save();
        }
      }
      console.log("Dropout check completed");
    } catch (error) {
      console.error("Error in dropout:", error);
    }
  });
};

// export const dailyAttendance =async (req:Request,res:Response) => {
//     try {
//       const students = await Student.find({ status: "started" });
//       for (const student of students) {
//         await Attendance.create({
//           studentId: student._id,
//         });
//       }
//       res.status(200).json({message:"attendance"})
//       console.log("Attendance created");
//     } catch (error) {
//       res.status(500).json({ message: error });

//       console.error("Error in dailyAttendance:", error);
//     }
// };

