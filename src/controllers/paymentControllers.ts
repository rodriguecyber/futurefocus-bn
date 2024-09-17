import { Request, Response } from "express";
import Payment from "../models/payment";
import Transaction from "../models/Transaction";

export class PaymentController {
  static SchoollFees = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount} = req.body;
    try {
      const payment = await Payment.findOneAndUpdate(
        { studentId: id },
        {
          $inc: { amountPaid: amount },
        }
      );
      if (!payment) {
        return res
          .status(404)
          .json({ message: "unable to find student payment" });
      }
      payment.status =
        payment.amountDue === 0
          ? "unpaid"
          : payment.amountDue > payment.amountPaid
          ? "partial"
          : payment.amountDue === payment.amountPaid
          ? "paid"
          : "overpaid";
      await payment.save();
      await Transaction.create({
        studentId: id,
        amount: amount,
        reason: "school fees",
      });
      res
        .status(200)
        .json({ message: `you have successfuly paid school fees of  ${amount}` });
    } catch (error: any) {
      res.status(500).json({ message: `Eror ${error.message} occured` });
    }
  };
  static payment = async (req:Request,res:Response)=>{
    try {
        const { id } = req.params;
        const payment = await Payment.find();
        res.status(200).json(payment)    } catch (error:any) {
       res.status(500) .json({ message: `Error ${error.message} occured` });
        
    }
  }

}
