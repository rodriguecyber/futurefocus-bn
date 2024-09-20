import { Request, Response } from "express";
import Cashflow from "../models/otherTransactions";

export class cashflowControler {
  static newData = async (req: Request, res: Response) => {
    const { user, amount, reason, payment,type } = req.body;
    try {
      await Cashflow.create({
        user,
        amount,
        payment,
        reason,
        type,
      });
      res.status(201).json({ message: `${type} created successfully` });
    } catch (error:any) {
        res.status(200).json({message:`Error ${error.message} ocuured`})
    }
  };
   static getAll = async(req:Request,res:Response)=>{
    try {
        const  cashflow = await Cashflow.find();
  res.status(200).json(cashflow)
    } catch (error:any) {
        res.status(200).json({ message: `Error ${error.message} ocuured` });
        
    }
   }
}