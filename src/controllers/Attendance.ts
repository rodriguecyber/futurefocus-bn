import { Request, Response } from "express";
import { Attendance } from "../models/Attendance";
import Student from "../models/Students";
import { StudentTypes } from "../types/Types";

type Shift =
  | "Morning A (8:30 AM - 10:30 AM)"
  | "Morning B (11:00 PM- 1:00PM)"
  | "Afternoon (3:00PM - 5:00 PM)"
  | "Evening (6:00 AM - 8:00PM)"
  | "Weekend (Saturday: 8:30 AM - 5:30 PM)"
  | "Online";


const shiftTimes: Record<Shift, { start: number; end: number }> = {
  "Morning A (8:30 AM - 10:30 AM)": { start: 8.5 * 60, end: 10.5 * 60 }, 
  "Morning B (11:00 PM- 1:00PM)": { start: 11 * 60, end: 13 * 60 }, 
  "Afternoon (3:00PM - 5:00 PM)": { start: 15 * 60, end: 17 * 60 }, 
  "Evening (6:00 AM - 8:00PM)": { start: 18 * 60, end: 20 * 60 }, 
  "Weekend (Saturday: 8:30 AM - 5:30 PM)": { start: 8 * 60, end: 17.5 * 60 }, 
  Online: { start: 8 * 60, end: 17.5 * 60 },
};

function isValidShift(shift: string): shift is Shift {
  return [
    "Morning A (8:30 AM - 10:30 AM)",
    "Morning B (11:00 PM- 1:00PM)",
    "Afternoon (3:00PM - 5:00 PM)",
    "Evening (6:00 AM - 8:00PM)",
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
      return res.status(400).json({ message: "Invalid shift" });
    }

    const shift = shiftTimes[student.selectedShift];

    if (currentTime < shift.start || currentTime > shift.end) {
      return res.status(400).json({
        message: "Attendance can only be marked during the assigned shift",
      });
    }

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let attendance = await Attendance.findOne({
      studentId: studentId,
      createdAt: { $gte: today },
    });

    if (attendance) {
     
      attendance.status = "present";
    } else {
      attendance = new Attendance({
        studentId: studentId,
        status: status,
      });
    }

    await attendance.save();

    res
      .status(200)
      .json({ message: "Attendance updated successfully", attendance });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
