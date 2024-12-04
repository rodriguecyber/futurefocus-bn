import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/token";
import Team from "../models/Team";
import { Institution } from "../models/institution";

export const isVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email,phone} = req.body
    if (!(email||phone)) {
      return res.status(401).json({ message: "enter email or phone number not found" });
    }
    const user = await Team.findOne({$or:[{email},{phone}]});
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const inst = await Institution.findById(user.institution)
    if(!inst){
       return res.status(400).json({message:"instution not found!"})
    }
if(!inst.verified){
       return res.status(400).json({ message: "instution not verified!" });
}
    next();

  } catch (error: any) {
    return res
      .status(500)
      .json({ message: `Error occurred: ${error.message} ` });
  }
};
