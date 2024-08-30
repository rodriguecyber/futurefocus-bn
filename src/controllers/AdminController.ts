import { Request, Response } from "express";
import Admin from "../models/Admin";
import { decodeToken, generateToken } from "../utils/token";
import { resetTemplates } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";
import { comparePassword, hashingPassword } from "../utils/PasswordUtils";
import { strict } from "assert";

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

      const user = await decodeToken(token); // Ensure this is an async function
      if (!user) {
        return res
          .status(400)
          .json({ message: "Failed to reset password, try again" });
      }

      const hashedPassword = await hashingPassword(password);
      await Admin.findOneAndUpdate(
        { _id: user._id },
        { password: hashedPassword }
      );
      return res.status(200).json({ message: "Password changed successfully" });
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

      const token = await generateToken(user);
      res.cookie("token", token as string, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Login successful", token });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${error.message}` });
    }
  };

  static getUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent in the Authorization header
      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }

      const user = await decodeToken(token); // Ensure this is an async function
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      return res.status(200).json({ user });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${error.message}` });
    }
  };
}
