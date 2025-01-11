
import { Router } from "express";
import { messageController } from "../controllers/messageController";

export const incidenceRouter = Router()
incidenceRouter.post("/", messageController.Report)
incidenceRouter.get("/", messageController.getMessage)
incidenceRouter.put("/:id", messageController.MarkRead)
