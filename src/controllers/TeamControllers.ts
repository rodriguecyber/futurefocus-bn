import { Request, Response } from "express";
import Team, { TeamAttendandance } from "../models/Team";
import { decodeToken, generateToken } from "../utils/token";
import { staffResetTemplates } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";
import { comparePassword, hashingPassword } from "../utils/PasswordUtils";
import { generateRandom4Digit } from "../utils/generateRandomNumber";

export class TeamControllers {
  static AddMember = async (req: Request, res: Response) => {
    try {
      const { name, title, image, email, role, instagram } = req.body;
      const isExist = await Team.findOne({ email: email });
      if (isExist) {
        return res.status(400).json({ message: "member already exist" });
      }
      await Team.create({ name, title, image, email, role, instagram });
      return res.status(200).json({ messsage: "member added" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `error ${error.message} Occured` });
    }
  };
  static Team = async (req: Request, res: Response) => {
    try {
      const team = await Team.find();
      return res.status(200).json(team);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error ${error.message} occured` });
    }
  };
  static teamAdmins = async (req: Request, res: Response) => {
    try {
      const admins= await Team.find({isAdmin:true});
      return res.status(200).json(admins);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error ${error.message} occured` });
    }
  };
  static deleteMember = async (req: Request, res: Response) => {
    try {
      const memberId = req.params.id;
      const member = await Team.findById(memberId);
      if (!member) {
        return res.status(400).json({ message: "member doesnot exists" });
      }

      await Team.deleteOne({ email: member.email });
      res.status(200).json({ message: "member deleted successfuly" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static update = async (req: Request, res: Response) => {
    try {
      const memberId = req.params.id;
      const { email, ...data } = req.body;
      const member = await Team.findById(memberId);

      if (!member) {
        return res.status(400).json({ message: "member does not exist" });
      }
      await Team.findByIdAndUpdate(memberId, data);
      res.status(200).json({ message: "updated successfull" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static toggleAdmin = async (req: Request, res: Response) => {
    try {
      const memberId = req.params.id;
      const member =await Team.findById(memberId);

      if (!member) {
        return res.status(400).json({ message: "member does not exist" });
      }
  
      await Team.findByIdAndUpdate(memberId, {isAdmin:!member.isAdmin});
      res.status(200).json({ message: "status updated successfull" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static requestAttend = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const attendance = await TeamAttendandance.findOne({
        _id: id,
        status: "absent",
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      }).exec();
      if (!attendance) {
        return res
          .status(400)
          .json({ message: "your can't request attend now " });
      }
      attendance.status = "pending";
      await attendance.save();
      return res
        .status(200)
        .json({ message: "your attendance sent, wait for approval" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static leave = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const attendance = await TeamAttendandance.findOne({
        _id: id,
        status: "present",
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      }).exec();
      if (!attendance) {
        return res.status(400).json({ message: "you did'nt attend to day " });
      }
      attendance.timeOut = new Date();
      await attendance.save();
      return res.status(200).json({ message: "thank you for coming" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static approveAttend = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const attendance = await TeamAttendandance.findOne({
        _id: id,
        status: "pending",
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      }).exec();
      if (!attendance) {
        return res.status(400).json({ message: "your attendance not found" });
      }
      attendance.status = "present";
      await attendance.save({ timestamps: false });
      return res.status(200).json({ message: " attendance approved" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static attendance = async (req: Request, res: Response) => {
    try {
      const attendance = await TeamAttendandance.find().populate("memberId");
      res.status(200).json(attendance);
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static myAttendance = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const attendance = await TeamAttendandance.find({ memberId: id });
      if (!attendance) {
        res.status(400).json({ message: `your have not attendance` });
      }
      res.status(200).json(attendance);
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const member = await Team.findOne({ email });
      if (!member) {
        return res
          .status(400)
          .json({ message: "Team with this email not found" });
      }
      const token = await generateToken({
        id: member._id,
        email: member.email,
      });
      const mailOptions = {
        from: process.env.OUR_EMAIL as string,
        to: member.email,
        subject: "Reset Admin Password",
        html: staffResetTemplates(member.name, token),
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
      await Team.findOneAndUpdate(
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
      const user = await Team.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Email not found" });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Password does not match" });
      }
      if(!user.isAdmin){
          const token = await generateToken({ id: user._id ,isAdmin:user.isAdmin});
          res.cookie("token", token as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res
            .status(200)
            .json({ message: "Logged in successfully", token });
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

      return res.status(200).json({ message: "che k your emial for OTP " });
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
      const user = await Team.findById(id);

      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      if (!user.isAdmin) {
        return res.status(401).json({ message: "only admin allowed" });
      }
      if (!user.otp) {
        return res.status(401).json({ message: "OTP expired login again" });
      }
      if (user.otp != OTP) {
        return res.status(401).json({ message: "Incorrect OTP" });
      }

          const token = await generateToken({
            id: user._id,
            isAdmin: user.isAdmin,
          });
      res.cookie("token", token as string, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      user.otp = null;
      await user.save();
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
      const user = await Team.findById(userinfo.id);
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
}
