import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

export const CourseRoute = Router();
CourseRoute.post("/new", CourseController.NewCourse);
CourseRoute.get("/", CourseController.getAll);
CourseRoute.put("/update/:id", CourseController.update);
CourseRoute.put("/activate/:id", CourseController.activate);
CourseRoute.delete("/delete/:id", CourseController.delete);
