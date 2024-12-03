import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { isloggedIn } from "../middleware/isLoggedIn";

export const CourseRoute = Router();
CourseRoute.post("/new", CourseController.NewCourse);
CourseRoute.get("/",isloggedIn, CourseController.getAll);
CourseRoute.put("/update/:id", CourseController.update);
CourseRoute.delete("/delete/:id", CourseController.delete);
