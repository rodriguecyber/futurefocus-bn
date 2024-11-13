import { Router } from "express";
import { AdminControllers } from "../controllers/AdminController";
import { getDashboardSummary } from "../controllers/DashboardControllers";
import { PermissionCointroller } from "../controllers/PermissionController";
import { messageController } from "../controllers/sendSms";

export const othersRoute = Router()
othersRoute.post('/subscribe', AdminControllers.subscribe)
othersRoute.post('/intake',  AdminControllers.addIntake)
othersRoute.get('/intake',  AdminControllers.getIntakes)
othersRoute.put('/role/:userId', PermissionCointroller.assignRole)
othersRoute.delete('/intake/:id', AdminControllers.deleteIntake) 
othersRoute.get('/dashboard', getDashboardSummary)
othersRoute.post('/sendmesage', messageController)