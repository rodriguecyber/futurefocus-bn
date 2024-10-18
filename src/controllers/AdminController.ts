"use client";
import { Request, response, Response } from "express";
import Admin from "../models/Admin";
import { decodeToken, generateToken } from "../utils/token";
import { resetTemplates, SubscriptionEmail } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";
import { comparePassword, hashingPassword } from "../utils/PasswordUtils";
import Subscriber from "../models/subscriber";
import Intake from "../models/Intake";
import { generateRandom4Digit } from "../utils/generateRandomNumber";
export class AdminControllers {
  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const isAdmin = await Admin.findOne({ email });
      if (!isAdmin) {
        return res
          .status(400)
          .json({ message: "Admin with this email not found" });
      }
      const token = await generateToken({
        id: isAdmin._id,
        email: isAdmin.email,
      });
      const mailOptions = {
        from: process.env.OUR_EMAIL as string,
        to: isAdmin.email,
        subject: "Reset Admin Password",
        html: resetTemplates(isAdmin, token),
      };
      await sendEmail(mailOptions);
      return res
        .status(200)
        .json({ message: "Check your email for instructions" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${error.message}` });
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      if (!token) {
        return res.status(400).json({ message: "Token not provided" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password not provided" });
      }

      const user = await decodeToken(token);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Failed to reset password, try again" });
      }

      const hashedPassword = await hashingPassword(password);
      await Admin.findOneAndUpdate(
        { _id: user.id },
        { password: hashedPassword }
      );
      console.log(password);
      console.log(user.id);
      return res.status(200).json({ message: "Password changed" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${error.message}` });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await Admin.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Email not found" });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Password does not match" });
      }

      const OTP = generateRandom4Digit();
      user.OTP = OTP;
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
        .json({ message: "Check your  email for OTP", id: user._id });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${error.message}` });
    }
  };

  static verifyOTP = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "No ID provided" });
      }

      const { OTP } = req.body;
      const user = await Admin.findById(id);

      if (!user) {
        return res.status(401).json({ message: "Admin not found" });
      }
if (!user.OTP) {
  return res.status(401).json({ message: "OTP expired login again" });
}
      if ( user.OTP != OTP) {
        return res.status(401).json({ message: "Incorrect OTP" });
      }
      

      const token = await generateToken({ id: user._id });
      res.cookie("token", token as string, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
         user.OTP=null 
     await user.save()
      return res.status(200).json({ message: "Logged in successfully", token });
    } catch (error: any) {
      console.error(error.message);
      return res
        .status(500)
        .json({ error: error.message || "Internal Server Error" });
    }
  };

  static getUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }

      const userinfo = await decodeToken(token);
      if (!userinfo) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const user = await Admin.findById(userinfo.id).populate({
        path: "role",
        populate: {
          path: "permission",
          populate: {
            path: "feature",
          },
        },
      });
      if (!user) {
        res.status(401).json({ message: "user not found" });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${error.message}` });
    }
  };
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
  static addAdmin = async (req: Request, res: Response) => {
    const { email, name } = req.body;
    try {
      const admin = await Admin.findOne({ email: email });
      if (admin) {
        return res.status(400).json({ message: "admin already registered" });
      }
      await Admin.create({
        email,
        name,
        role: null,
      });
      res.status(200).json({ message: "admin added" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static updateAdmin = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, isSuperAdmin } = req.body;
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(400).json({ message: "admin not available" });
      }
      await Admin.findByIdAndUpdate(id, { name, email, isSuperAdmin });
      res.status(200).json({ message: "admin updated" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static view = async (req: Request, res: Response) => {
    try {
      const admins = await Admin.find().populate("role");
      res.status(200).json(admins);
    } catch (error: any) {
      res.status(500).json({ message: `Error '${error.message} occured` });
    }
  };
  static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(400).json({ message: "admin not available" });
      }
      await Admin.findByIdAndDelete(id);
      res.status(200).json({ message: "admin deleted succesfully" });
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
