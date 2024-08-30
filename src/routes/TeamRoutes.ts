import { Router } from "express";
import { TeamControllers } from "../controllers/TeamControllers";

export const TeamRoute = Router()
TeamRoute.post("/new",TeamControllers.AddMember)
TeamRoute.get("/",TeamControllers.Team)
TeamRoute.delete("/delete/:id",TeamControllers.deleteMember)
TeamRoute.put("/update/:id",TeamControllers.update)