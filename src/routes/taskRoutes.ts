import { Router } from "express";
import { taskController } from "../controllers/TaskController";

export const taskRouter = Router();
taskRouter.post("", taskController.newTask);
taskRouter.put("/:id", taskController.changeStatus);
taskRouter.patch("/:id", taskController.update);
taskRouter.delete("/:id", taskController.delete);
taskRouter.get("", taskController.getTasks);
taskRouter.post("/comment/:id", taskController.addComment);
taskRouter.post("/comment/reply/:id", taskController.addReply);
taskRouter.get("/:id", taskController.getTasksByUser); 
