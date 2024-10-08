import { Router } from "express";
import { AdminControllers } from "../controllers/AdminController";
import { getDashboardSummary } from "../controllers/DashboardControllers";
import { PermissionCointroller } from "../controllers/PermissionController";

export const AdminRoutes = Router()
AdminRoutes.post('/forgot-password', AdminControllers.forgotPassword)
AdminRoutes.post('/login', AdminControllers.login)
AdminRoutes.post('/two-factor/:id', AdminControllers.verifyOTP)
AdminRoutes.post('/subscribe', AdminControllers.subscribe)
AdminRoutes.post('/new',  AdminControllers.addAdmin)
AdminRoutes.post('/intake',  AdminControllers.addIntake)
AdminRoutes.get('/intake',  AdminControllers.getIntakes)
AdminRoutes.get('/', AdminControllers.getUser)
AdminRoutes.get('/admins', AdminControllers.view)
AdminRoutes.put('/reset-password/:token', AdminControllers.resetPassword)
AdminRoutes.put('/:id', AdminControllers.updateAdmin)
AdminRoutes.put('/role/:userId', PermissionCointroller.assignRole)
AdminRoutes.delete('/delete/:id', AdminControllers.delete)
AdminRoutes.delete('/intake/:id', AdminControllers.deleteIntake) 
AdminRoutes.get('/dashboard', getDashboardSummary)