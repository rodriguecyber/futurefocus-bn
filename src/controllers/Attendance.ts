import { Request, Response } from "express";
import { Attendance } from "../models/Attendance";
import Student from "../models/Students";


type Shift =
  | "Morning A (8:30 AM - 10:30 AM)"
  | "Morning B (11:00 AM - 1:00 PM)"
  | "Afternoon (3:00 PM - 5:00 PM)"
  | "Evening (6:00 PM - 8:00 PM)"
  | "Weekend (Saturday: 8:30 AM - 5:30 PM)"
  | "Online";


const shiftTimes: Record<Shift, { start: number; end: number }> = {
  "Morning A (8:30 AM - 10:30 AM)": { start: 6.5 * 60, end: 10.5 * 60 }, 
  "Morning B (11:00 AM - 1:00 PM)": { start: 9 * 60, end: 11 * 60 }, 
  "Afternoon (3:00 PM - 5:00 PM)": { start: 13 * 60, end: 15 * 60 }, 
  "Evening (6:00 PM - 8:00 PM)": { start: 16 * 60, end: 18 * 60 }, 
  "Weekend (Saturday: 8:30 AM - 5:30 PM)": { start: 6 * 60, end: 15.5 * 60 }, 
  Online: { start: 6 * 60, end: 15.5 * 60 },
};

function isValidShift(shift: string): shift is Shift {
  return [
    "Morning A (8:30 AM - 10:30 AM)",
    "Morning B (11:00 AM - 1:00 PM)",
    "Afternoon (3:00 PM - 5:00 PM)",
    "Evening (6:00 PM - 8:00 PM)",
    "Weekend (Saturday: 8:30 AM - 5:30 PM)",
    "Online",
  ].includes(shift);
}

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId} = req.params;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); 

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.status!=='started') {
      return res.status(404).json({ message: "Student not started yet" });
    }

    if (!isValidShift(student.selectedShift)) {
      return res.status(400).json({ message: "Invalid shiift" });
    }

    const shift = shiftTimes[student.selectedShift];

    if (currentTime < shift.start || currentTime > shift.end) {
      return res.status(400).json({
        message: "You can only attend on your shift",
      });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let attendance = await Attendance.findOne({
      studentId: studentId,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    }).exec();
    if (attendance) {
     
      attendance.status = "present";
    } else {
      // attendance = new Attendance({
      //   studentId: studentId,
      //   status: 'present',
      // });
      return res.status(400).json({message:"attendance today not available"})
    }

    await attendance.save();

    res
      .status(200)
      .json({ message: "Attending successfully", attendance });
  } catch (error) {
    console.error("Error attending:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAttendance = async (req:Request,res:Response)=>{
  try {
    const attendance = await Attendance.find().populate("studentId");
    res.status(200).json(attendance)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    
  }

}