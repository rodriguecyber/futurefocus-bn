import { Request, Response } from "express";
import Payment from "../models/payment";
import Student from "../models/Students";

// Get dashboard summary
export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    // Count total students
    const totalStudents = await Student.countDocuments();

    // Count students by status
    const totalPending = await Student.countDocuments({ status: "pending" });
    const totalAccepted = await Student.countDocuments({ status: "accepted" });
    const totalRegistered = await Student.countDocuments({
      status: "registered",
    });
    const totalCompleted = await Student.countDocuments({
      status: "completed",
    });
    const totalDroppedOut = await Student.countDocuments({
      status: "droppedout",
    });

    // Count total payments
    const totalPayments = await Payment.countDocuments();
    const totalPaid = await Payment.countDocuments({ status: "paid" });
    const totalUnpaid = await Payment.countDocuments({ status: "unpaid" });
    const totalPartial = await Payment.countDocuments({ status: "partial" });
    const totalOverpaid = await Payment.countDocuments({ status: "overpaid" });

    // Aggregate total amount paid
    const totalAmountPaid = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amountPaid" },
        },
      },
    ]);

    const totalAmountTobePaid = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amountDue" },
        },
      },
    ]);

    // Calculate total amount unpaid
    const totalAmountUnpaid = await Payment.aggregate([
      {
        $match: {$or:[{status: "unpaid"},{status:"partial"}]  },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: { $subtract: ["$amountDue", "$amountPaid"] },
          },
        },
      },
    ]);

    // Calculate total amount overpaid
    const totalAmountOverpaid = await Payment.aggregate([
      {
        $match: { status: "overpaid" },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: { $subtract: ["$amountPaid", "$amountDue"] },
          },
        },
      },
    ]);

    const summary = {
      totalStudents,
      totalPending,
      totalAccepted,
      totalRegistered,
      totalCompleted,
      totalDroppedOut,
      totalPayments,
      totalPaid,
      totalUnpaid,
      totalPartial,
      totalOverpaid,
      totalAmountPaid: totalAmountPaid[0]?.totalAmount || 0,
      totalAmountTobePaid: totalAmountTobePaid[0]?.totalAmount || 0,
      totalAmountUnpaid: totalAmountUnpaid[0]?.totalAmount || 0,
      totalAmountOverpaid: totalAmountOverpaid[0]?.totalAmount || 0,
    };

    res.status(200).json(summary);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
