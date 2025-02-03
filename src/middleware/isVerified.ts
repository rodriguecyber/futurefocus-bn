import { NextFunction, Request, Response } from "express";
import Team from "../models/Team";
import { Institution } from "../models/institution";

export const isVerified = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const loggedUser = req.loggedUser
    console.log(loggedUser||'no user')
    const user = await Team.findById(loggedUser._id);
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
      .json({ message: `Error occurre: ${error.message} ` });
  }
};
