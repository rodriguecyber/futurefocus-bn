import { Request, Response } from "express";
import Cashflow from "../models/otherTransactions"; // Adjust the path to your model
import Transaction from "../models/Transaction";
import Payment from "../models/payment";
import Student from "../models/Students";

export const deleteOldTransactions = async (req: Request, res: Response) => {
  const currentDate = new Date();
  const cutoffDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    23
  );

  try {
    const result = await Payment.findOneAndDelete({studentId:`66f167236c7377cd498466c3`}
    );
    res.status(200).json(result);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting transactions', error: error.message });
  }
};
