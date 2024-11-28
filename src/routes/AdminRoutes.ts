import { Router } from "express";
import { AdminControllers } from "../controllers/AdminController";
import { getDashboardSummary } from "../controllers/DashboardControllers";
import { PermissionCointroller } from "../controllers/PermissionController";
import { messageController } from "../controllers/sendSms";

export const othersRoute = Router()
othersRoute.post('/subscribe', AdminControllers.subscribe)
othersRoute.post('/intake',  AdminControllers.addIntake)
othersRoute.get('/intake',  AdminControllers.getIntakes)
othersRoute.post('/shift',  AdminControllers.addShift)
othersRoute.put('/shift/:id',  AdminControllers.updateShift)
othersRoute.get('/shift',  AdminControllers.getShifts)
othersRoute.put('/role/:userId', PermissionCointroller.assignRole)
othersRoute.delete('/intake/:id', AdminControllers.deleteIntake) 
othersRoute.delete('/shift/:id', AdminControllers.deleteShift) 
othersRoute.get('/dashboard', getDashboardSummary)
othersRoute.post('/sendmessage', messageController) 