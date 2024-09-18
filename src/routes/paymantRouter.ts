import { Router } from "express";
import { PaymentController } from "../controllers/paymentControllers";

export const paymantRouter = Router()
paymantRouter.get('/',PaymentController.payment)
paymantRouter.get('/transaction',PaymentController.getTansactions)
paymantRouter.post('/pay/:id',PaymentController.SchoollFees)