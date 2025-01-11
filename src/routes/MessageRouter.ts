
import { Router } from "express";
import { messageController } from "../controllers/messageController";

export const messageRouter = Router()
messageRouter.post("/", messageController.Report)
messageRouter.get("/", messageController.getMessage)
messageRouter.put("/:id", messageController.MarkRead)
