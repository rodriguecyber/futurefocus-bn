import { Router } from "express";
import { StudentControllers } from "../controllers/StudentsController";
import { getAttendance,
     updateAttendance 
    } from "../controllers/Attendance";
import { isloggedIn } from "../middleware/isLoggedIn";
import { isVerified } from "../middleware/isVerified";
import { hasAcces } from "../middleware/hasAcces";


export const StudentRoutes =  Router()
StudentRoutes.post('/apply',StudentControllers.apply)
StudentRoutes.post('/past',StudentControllers.pastRecord)
StudentRoutes.post('/techup',StudentControllers.techupapply)
StudentRoutes.post('/techup/notify',StudentControllers.notifyTechups)
StudentRoutes.get('/techup',StudentControllers.techUpStudent)
StudentRoutes.get("/",isloggedIn, isVerified,
    // (req,res,next)=>hasAcces(req,res,next,'student'),
    StudentControllers.students)
StudentRoutes.delete('/:id',StudentControllers.delete)
StudentRoutes.put('/:id',StudentControllers.changeStatus)
StudentRoutes.post('/register',StudentControllers.registerNew)
StudentRoutes.put("/attend/:studentId", updateAttendance);
StudentRoutes.get("/attendance", getAttendance);
StudentRoutes.put("/comment/:id", StudentControllers.AddComment);
StudentRoutes.put("/update/:id", StudentControllers.Update);


