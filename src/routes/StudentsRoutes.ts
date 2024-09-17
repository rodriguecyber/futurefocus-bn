import { Router } from "express";
import { StudentControllers } from "../controllers/StudentsController";
import { updateAttendance } from "../controllers/Attendance";


export const StudentRoutes =  Router()
StudentRoutes.post('/apply',StudentControllers.apply)
StudentRoutes.get("/",StudentControllers.students)
StudentRoutes.delete('/:id',StudentControllers.delete)
StudentRoutes.put('/:id',StudentControllers.changeStatus)
StudentRoutes.post('/register',StudentControllers.registerNew)
StudentRoutes.put("/attend/:studentId", updateAttendance);
