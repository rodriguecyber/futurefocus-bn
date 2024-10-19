"use client";
import { Request, response, Response } from "express";
import { decodeToken, generateToken } from "../utils/token";
import { resetTemplates, SubscriptionEmail } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";
import { comparePassword, hashingPassword } from "../utils/PasswordUtils";
import Subscriber from "../models/subscriber";
import Intake from "../models/Intake";
import { generateRandom4Digit } from "../utils/generateRandomNumber";
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
  static getIntakes = async (req: Request, res: Response) => {
    try {
      const intakes = await Intake.find();
      res.status(200).json({ intakes });
    } catch (error) {
      res.status(500).json({ message: "failed to load intakes" });
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
}
