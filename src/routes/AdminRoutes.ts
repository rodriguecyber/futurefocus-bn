import { Router } from "express";
import { AdminControllers } from "../controllers/AdminController";
import { getDashboardSummary } from "../controllers/DashboardControllers";
import { PermissionCointroller } from "../controllers/PermissionController";

export const AdminRoutes = Router()
AdminRoutes.post('/subscribe', AdminControllers.subscribe)
AdminRoutes.post('/intake',  AdminControllers.addIntake)
AdminRoutes.get('/intake',  AdminControllers.getIntakes)
AdminRoutes.put('/role/:userId', PermissionCointroller.assignRole)
AdminRoutes.delete('/intake/:id', AdminControllers.deleteIntake) 
AdminRoutes.get('/dashboard', getDashboardSummary)