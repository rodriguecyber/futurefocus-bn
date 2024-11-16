import { Request, Response } from "express";
import Student from "../models/Students";
import Transaction from "../models/Transaction";
import Payment from "../models/payment";
import Course from "../models/Course";
import Cashflow from "../models/otherTransactions";
import { comparePassword } from "../utils/PasswordUtils";
import OnlineStudent from "../models/onlineStudent";
import { sendEmail } from "../utils/sendEmail";
import { generateRandom4Digit } from "../utils/generateRandomNumber";
import { sendMessage } from "../utils/sendSms";
import { MessageTemplate } from "../utils/messageBod";
import techUp from "../models/techUp";

export class StudentControllers {
  static apply = async (req: Request, res: Response) => {
    const studentData = req.body;
  
    try {
      const alreadyExist =
        await Student.findOne({ phone: studentData.phone });
      if (alreadyExist) {
        return res.status(400).json({ message: "You have already applied " });
      }
      await Student.create(studentData);
      await sendMessage(
        MessageTemplate({
          name: studentData.name,
          amount: 0,
          remain: 0,
          course: studentData.selectedCourse,
        }).apply,
        [studentData.phone]
      );
      return res.status(200).json({ message: "Your application submitted" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `failed to apply! try again ${error.message}` });
    }
  };
  static techupapply = async (req: Request, res: Response) => {
    const student = req.body;
  
    try {
      const alreadyExist =
        await Student.findOne({ phone: student.phone });
      if (alreadyExist) {
        return res.status(400).json({ message: "You have already applied " });
      }
      await techUp.create(student);
      await sendMessage(
        MessageTemplate({
          name: student.name,
          amount: 0,
          remain: 0,
          course: student.selectedCourse,
        }).techup,
        [student.phone]
      );
      return res.status(200).json({ message: "Your application submitted" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `failed to apply! try again ${error.message}` });
    }
  };

  static students = async (req: Request, res: Response) => {
    try {
      const students = await Student.find().sort({ createdAt: -1 });
      return res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occurred` });
    }
  };
  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const student = await Student.findByIdAndDelete(id);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      await Payment.findOneAndDelete({ studentId: student._id });
      res.status(200).json({ message: "student deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static changeStatus = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { status, user, paymentMethod } = req.body;

    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const course = await Course.findOne({
        title: {
          $regex: new RegExp(
            `^\\s*${student.selectedCourse.replace(/\s+/g, "\\s*")}\\s*$`,
            "i"
          ),
        },
      });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      await Student.findByIdAndUpdate(id, { status: status });
      if (status === "registered") {
        await Transaction.create({
          studentId: student._id,
          amount: 10000,
          reason: "Registration fees",
        });
        await Cashflow.create({
          user: user,
          amount: 10000,
          reason: `${student.name} registration Fees`,
          payment: paymentMethod,
          type: "income",
        });
        await Payment.create({
          studentId: student._id,
          amountDue: course.scholarship,
          amountDiscounted: course.nonScholarship - course.scholarship,
        });
      await sendMessage(
        MessageTemplate({ name: student.name, amount: 0, remain: 0 ,course:student.selectedCourse}).register,
        [student.phone.toString()]
      );

      }
      else if(status==='accepted'){
      await sendMessage(
        MessageTemplate({
          name: student.name,
          amount: 0,
          remain: 0,
          course: student.selectedCourse,
        }).admit,
        [student.phone.toString()]
      );

      }

      res.status(200).json({ message: `student new status ${status}` });
    } catch (error: any) {
      res.status(500).json({ message: `${error.message} occured` });
    }
  };
  // static pay = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const { amount } = req.body;

  //   try {
  //     const student = await Student.findById(id);
  //     if (!student) {
  //       return res.status(404).json({ message: "student not found" });
  //     }

  //     await Transaction.create({
  //       studentId: student._id,
  //       amount,
  //       reason: "school fees fees",
  //     });
  //   } catch (error: any) {
  //     res.status(500).json({ message: `Error ${error.message} occured` });
  //   }
  // };
  static registerNew = async (req: Request, res: Response) => {
    const student = req.body;
    try {
      const course = await Course.findOne({ title: student.selectedCourse });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      const alreadyExist = await Student.findOne({ phone: student.phone });
      if (alreadyExist) {
        return res.status(400).json({ message: "You have already registered" });
      }
      const registerStudent = new Student(student);
      registerStudent.status = "registered";
      await Payment.create({
        studentId: registerStudent._id,
        amountDue: course.nonScholarship,
      });
      await Transaction.create({
        studentId: registerStudent._id,
        amount: 10000,
        reason: "Registration fees",
      });
      await Cashflow.create({
        amount: 10000,
        reason: `${student.name} registration Fees`,
        user: student.user,
        payment: student.payment,
        type: "income",
      });
      await registerStudent.save();
      await sendMessage(
        MessageTemplate({
          name: student.name,
          amount: 0,
          remain: 0,
          course: student.selectedCourse,
        }).register,
        [student.phone]
      );
      res.status(201).json({ message: "new student registered" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static Update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const student = await Student.findByIdAndUpdate(id, data);
      if (!student) {
        return res.status(400).json({ message: "no student found" });
      }
      return res.status(200).json({ message: "student updated" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `internal server error ${error}` });
    }
  };
  static AddComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(400).json({ message: "no student found" });
      }
      await student.updateOne(
        { comment },
        {
          timestamps: false,
        }
      );
      await student.save();
      return res.status(200).json({ message: "student updated" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error ${error}` });
    }
  };
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await OnlineStudent.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Password does not match" });
      }

      const OTP = generateRandom4Digit();
      user.otp = OTP;
      await user.save();
      const mailOptions = {
        from: process.env.OUR_EMAIL,
        to: user.email,
        subject: " One Time Password Code",
        html: `
            <h1>One-Time Password (OTP)</h1>
            <p>Dear User,</p>
            <p>Your OTP is <strong>${OTP}</strong>.</p>
            <p>Thank you!</p>
        `,
      };
      await sendEmail(mailOptions);

      return res
        .status(200)
        .json({ message: "check your email for OTP "});
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${error.message}` });
    }
  };
}
