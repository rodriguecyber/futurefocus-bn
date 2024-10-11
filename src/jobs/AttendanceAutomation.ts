import cron from "node-cron"; 
import Student from "../models/Students";
import { Attendance } from "../models/Attendance";  
import Team, { TeamAttendandance } from "../models/Team";

export const dailyAttendance = () => {
  cron.schedule("25 6 * * 1-4", async () => { 
    try {
      const students = await Student.find({
        status: "started",
        selectedShift: { $ne: "Weekend (Saturday: 8:30 AM - 5:30 PM)" },
      });
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
export const teamAttendance = () => {
  cron.schedule("15 10 * * 1-6", async () => { 
    try {
      const members = await Team.find();
      for (const member of members) {
        await TeamAttendandance.create({
          memberId: member._id
        });
      }
      console.log("Attendance fo team created");
    } catch (error) {
      console.error("Error in dailyAttendance:", error);
    }
  });
};
  cron.schedule("25 6 * * 6", async () => { 
    try {
      const students = await Student.find({
        status: "started",
        selectedShift: "Weekend (Saturday: 8:30 AM - 5:30 PM)" ,
      });
      for (const student of students) {
        await Attendance.create({
          studentId: student._id,
        });
      }
      console.log("Attendance for weekend created");
    } catch (error) {
      console.error("Error in dailyAttendance:", error);
    }
  });


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


