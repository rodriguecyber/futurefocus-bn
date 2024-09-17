import cron from "node-cron";
import Student from "../models/Students";
import { Attendance } from "../models/Attendance";


export const dailyAttendance = () => {
  cron.schedule("0 8 * * *", async () => {
    const students = await Student.find({ status: "started" });
    students.forEach(async (student) => {
      await Attendance.create({
        studentId: student._id,
      });
    });
    console.log(students);
  });
};

