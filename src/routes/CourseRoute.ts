import { Router } from "express";
import { ServiceController } from "../controllers/ServivicesController";
import { CourseController } from "../controllers/CourseController";

export const CourseRoute = Router();
CourseRoute.post("/new", CourseController.NewCourse);
CourseRoute.get("/", CourseController.getAll);
CourseRoute.put("/update/:id", CourseController.update);
CourseRoute.delete("/delete/:id", CourseController.delete);
