import { Router } from "express";
import { ServiceController } from "../controllers/ServivicesController";

export const ServiceRoute = Router()
ServiceRoute.post("/new", ServiceController.NewService)
ServiceRoute.get("/", ServiceController.getAll)
ServiceRoute.put("/update/:id", ServiceController.update)
ServiceRoute.delete("/delete/:id", ServiceController.delete)
