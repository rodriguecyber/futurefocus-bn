import { Router } from "express";
import { AdminControllers } from "../controllers/AdminController";

export const AdminRoutes = Router()
AdminRoutes.post('/forgot-password', AdminControllers.forgotPassword)
AdminRoutes.post('/login', AdminControllers.login)
AdminRoutes.post('/subscribe', AdminControllers.subscribe)
AdminRoutes.post('/new',  AdminControllers.addAdmin)
AdminRoutes.post('/new',  AdminControllers.addAdmin)
AdminRoutes.get('/', AdminControllers.getUser)
AdminRoutes.get('/admins', AdminControllers.view)
AdminRoutes.put('/reset-password/:token', AdminControllers.resetPassword)
AdminRoutes.put('/update', AdminControllers.updateAdmin)
AdminRoutes.delete('/delete/:id', AdminControllers.delete)