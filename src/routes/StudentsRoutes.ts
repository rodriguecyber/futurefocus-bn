import { Router } from "express";
import { StudentControllers } from "../controllers/StudentsController";
import { getAttendance,
     updateAttendance 
    } from "../controllers/Attendance";


export const StudentRoutes =  Router()
StudentRoutes.post('/apply',StudentControllers.apply)
StudentRoutes.post('/past',StudentControllers.pastRecord)
StudentRoutes.post('/techup',StudentControllers.techupapply)
StudentRoutes.post('/techup/notify',StudentControllers.notifyTechups)
StudentRoutes.get('/techup',StudentControllers.techUpStudent)
StudentRoutes.get("/",StudentControllers.students)
StudentRoutes.delete('/:id',StudentControllers.delete)
StudentRoutes.put('/:id',StudentControllers.changeStatus)
StudentRoutes.post('/register',StudentControllers.registerNew)
StudentRoutes.put("/attend/:studentId", updateAttendance);
StudentRoutes.get("/attendance", getAttendance);
StudentRoutes.put("/comment/:id", StudentControllers.AddComment);
StudentRoutes.put("/update/:id", StudentControllers.Update);


