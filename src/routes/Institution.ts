import { Router } from "express";
import { InstitutionControllers } from "../controllers/InstitutionControllers";

export const InstitutionRouter = Router()
InstitutionRouter.get('/',InstitutionControllers.all)
InstitutionRouter.post('/',InstitutionControllers.register)
InstitutionRouter.put('/',InstitutionControllers.activateAllFeatures)
InstitutionRouter.put('/',InstitutionControllers.activateSomeFeatures)
InstitutionRouter.put('/feature',InstitutionControllers.addfeature)
InstitutionRouter.put('/verify',InstitutionControllers.verify)