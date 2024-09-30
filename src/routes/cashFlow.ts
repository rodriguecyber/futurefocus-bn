import { Router } from "express";
import { cashflowControler } from "../controllers/cashFlowControlers";

export const cashRouter = Router()
cashRouter.get("/", cashflowControler.getAll)
cashRouter.post("/", cashflowControler.newData)
cashRouter.delete("/:id", cashflowControler.delete)
