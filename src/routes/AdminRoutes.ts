import { Router } from "express";
import { AdminControllers } from "../controllers/AdminController";
import { getDashboardSummary } from "../controllers/DashboardControllers";

export const AdminRoutes = Router()
AdminRoutes.post('/forgot-password', AdminControllers.forgotPassword)
AdminRoutes.post('/login', AdminControllers.login)
AdminRoutes.post('/subscribe', AdminControllers.subscribe)
AdminRoutes.post('/new',  AdminControllers.addAdmin)
AdminRoutes.post('/intake',  AdminControllers.addIntake)
AdminRoutes.get('/intake',  AdminControllers.getIntakes)
AdminRoutes.get('/', AdminControllers.getUser)
AdminRoutes.get('/admins', AdminControllers.view)
AdminRoutes.put('/reset-password/:token', AdminControllers.resetPassword)
AdminRoutes.put('/update', AdminControllers.updateAdmin)
AdminRoutes.delete('/delete/:id', AdminControllers.delete)
AdminRoutes.delete('/intake/:id', AdminControllers.deleteIntake) 
AdminRoutes.get('/dashboard', getDashboardSummary)  // get a single intake