"use client";
import { Request, Response } from "express";
import { SubscriptionEmail } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";
import Subscriber from "../models/subscriber";
import Intake, { Shift } from "../models/Intake";
export class AdminControllers {
  static subscribe = async (req: Request, res: Response) => {
    const email = req.body.email;
    const mailOptions = {
      from: process.env.OUR_EMAIL as string,
      to: email,
      subject: "Subscribed",
      html: SubscriptionEmail(),
    };

    try {
      const subscriber = await Subscriber.findOne({ email: email });
      if (subscriber) {
        return res.status(400).json({ message: "already subscribed" });
      }
      await Subscriber.create({ email: email });
      await sendEmail(mailOptions);
      res.status(200).json({ message: "thank you for subscribing " });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
    static addIntake = async (req: Request, res: Response) => {
    const { intake } = req.body;
    try {
      const isAvailable = await Intake.findOne({ intake: intake });
      if (isAvailable) {
        return res.status(400).json({ message: "intake already available" });
      }
      await Intake.create({
        intake: intake,
      });
      res.status(200).json({ message: "intake added" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message}` });
    }
  };
    static addShift = async (req: Request, res: Response) => {
    const { start,end,name,days } = req.body;
    try {
      await Shift.create({
        start,end,name,days
      });
      res.status(201).json({ message: "shifts added" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message}` });
    }
  };
    static updateShift = async (req: Request, res: Response) => {
    const data = req.body;
    const {id} = req.params
    try {
      await Shift.findByIdAndUpdate(id,data);
      res.status(200).json({ message: "shifts updated" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message}` });
    }
  };
  static getIntakes = async (req: Request, res: Response) => {
    try {
      const intakes = await Intake.find();
      res.status(200).json({ intakes });
    } catch (error) {
      res.status(500).json({ message: "failed to load intakes" });
    }
  };
  static getShifts = async (req: Request, res: Response) => {
    try {
      const shifts = await Shift.find();
      res.status(200).json({ shifts });
    } catch (error) {
      res.status(500).json({ message: "failed to load shifts" });
    }
  };
  static deleteIntake = async (req: Request, res: Response) => {
    const { id } = req.params;
    const intake = await Intake.findById(id);
    if (!intake) {
      return res.status(400).json({ message: "intake not found" });
    }
    await Intake.deleteOne({ _id: id });
    res.status(200).json({ message: "intake deleted" });
  };
  static deleteShift = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    const shift = await Shift.findById(id);
    if (!shift) {
      return res.status(400).json({ message: "shift not found" });
    }
    await Shift.deleteOne({ _id: id });
    res.status(200).json({ message: "shift deleted" });
  };
}
