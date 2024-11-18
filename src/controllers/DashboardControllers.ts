import { Request, Response } from "express";
import Payment from "../models/payment";
import Student from "../models/Students";
import Cashflow from "../models/otherTransactions";

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    // Total number of students
    const totalStudents = await Student.countDocuments();

    // Student status counts
    const studentStatuses = await Student.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const studentStatusCounts = studentStatuses.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Total number of payments
    const totalPayments = await Payment.countDocuments();

    // Payment status counts
    const paymentStatuses = await Payment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const paymentStatusCounts = paymentStatuses.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Aggregate total amount paid
    const totalAmountPaid = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amountPaid" },
        },
      },
    ]);

    // Aggregate total amount to be paid
    const totalAmountToBePaid = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amountDue" },
        },
      },
    ]);

    // Statistics by shift for students
    const shiftStudents = await Student.aggregate([
      {
        $group: {
          _id: "$selectedShift",
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          accepted: {
            $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
          },
          registered: {
            $sum: { $cond: [{ $eq: ["$status", "registered"] }, 1, 0] },
          },
          started: {
            $sum: { $cond: [{ $eq: ["$status", "started"] }, 1, 0] },
          },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          droppedout: {
            $sum: { $cond: [{ $eq: ["$status", "droppedout"] }, 1, 0] },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const departmentStudents = await Student.aggregate([
      {
        $group: {
          _id: "$selectedCourse",
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          accepted: {
            $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
          },
          registered: {
            $sum: { $cond: [{ $eq: ["$status", "registered"] }, 1, 0] },
          },
          started: {
            $sum: { $cond: [{ $eq: ["$status", "started"] }, 1, 0] },
          },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          droppedout: {
            $sum: { $cond: [{ $eq: ["$status", "droppedout"] }, 1, 0] },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Statistics by shift for payments (updated to check for associated students)
    const shiftPayments = await Payment.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $match: {
          student: { $ne: [] }, // Filter out payments without associated students
        },
      },
      {
        $unwind: "$student",
      },
      {
        $group: {
          _id: "$student.selectedShift",
          totalPaid: {
            $sum: "$amountPaid",
          },
          totalDue: {
            $sum: "$amountDue",
          },
        },
      },
      {
        $addFields: {
          totalUnpaid: {
            $subtract: ["$totalDue", "$totalPaid"], // Calculate unpaid as due minus paid
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Monthly statistics for cash flows
    const monthlyCashflows = await Cashflow.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          totalExpenses: {
            $sum: { $cond: [{ $eq: ["$type", "expenses"] }, "$amount", 0] },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const summary = { 
      totalStudents,
      studentStatusCounts,
      totalPayments,
      paymentStatusCounts,
      totalAmountPaid: totalAmountPaid[0]?.totalAmount || 0,
      totalAmountToBePaid: totalAmountToBePaid[0]?.totalAmount || 0,
      shiftStudents,
      departmentStudents,
      shiftPayments,
      monthlyCashflows,
    };

    res.status(200).json(summary);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
