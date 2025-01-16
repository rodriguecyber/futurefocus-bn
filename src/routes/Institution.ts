import { Router } from "express";
import { InstitutionControllers } from "../controllers/InstitutionControllers";
import upload from "../middleware/upload.middleware";

export const InstitutionRouter = Router()
InstitutionRouter.get('/',InstitutionControllers.all)
InstitutionRouter.post('/' ,upload.single('logo'), InstitutionControllers.register)
InstitutionRouter.put('/',InstitutionControllers.activateAllFeatures)
InstitutionRouter.put('/',InstitutionControllers.activateSomeFeatures)
InstitutionRouter.put('/feature',InstitutionControllers.addfeature)
InstitutionRouter.put('/verify',InstitutionControllers.verify)