import { Router } from "express";
import { StudentControllers } from "../controllers/StudentsController";

export const StudentRoutes =  Router()
StudentRoutes.post('/apply',StudentControllers.apply)
StudentRoutes.get("/",StudentControllers.students)
StudentRoutes.delete('/:id',StudentControllers.delete)
StudentRoutes.put('/:id',StudentControllers.admit)
