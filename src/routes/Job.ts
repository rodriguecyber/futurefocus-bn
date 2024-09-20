import { Router } from "express";
import { dailyAttendance } from "../jobs/AttendanceAutomation";

export const JobRouter = Router()
JobRouter.get("/",dailyAttendance)