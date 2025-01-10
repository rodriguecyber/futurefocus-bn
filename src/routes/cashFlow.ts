import { Router } from "express";
import { cashflowControler } from "../controllers/cashFlowControlers";
import { hasAcces } from "../middleware/hasAcces";

export const cashRouter = Router()
cashRouter.get("/",(req,res,next)=>hasAcces(req,res,next,'cashflow'), cashflowControler.getAll)
cashRouter.post("/", cashflowControler.newData)
cashRouter.delete("/:id", cashflowControler.delete)
