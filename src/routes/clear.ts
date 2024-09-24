import { Router } from "express";
import { deleteOldTransactions } from "../controllers/clean";

export const clearRoute = Router()
clearRoute.delete("",deleteOldTransactions)