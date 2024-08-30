import { Router } from "express";
import { AdminControllers } from "../controllers/AdminController";

export const AdminRoutes = Router()
AdminRoutes.post('/forgot-password', AdminControllers.forgotPassword)
AdminRoutes.put('/reset-password/:token', AdminControllers.resetPassword)
AdminRoutes.post('/login', AdminControllers.login)
AdminRoutes.get('/', AdminControllers.getUser)