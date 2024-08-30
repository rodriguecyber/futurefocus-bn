import { Request, Response } from "express";
import Team from "../models/Team";

export class TeamControllers {
  static AddMember = async (req: Request, res: Response) => {
    try {
      const { name, title, image, email, role, instagram } = req.body;
      const isExist = await Team.findOne({ email: email });
      if (isExist) {
        return res.status(400).json({ message: "member already exist" });
      }
      await Team.create({ name, title, image, email,role, instagram });
      return res.status(200).json({ message: "member added" });
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
      const {email, ...data} = req.body;
      const member = Team.findById(memberId);

      if (!member) {
        return res.status(400).json({ message: "member does not exist" });
      }
      await Team.findByIdAndUpdate(memberId,data);
      res.status(200).json({ message: "updated successfull" });
    } catch (error:any) {
        res.status(500).json({message:`Error ${error.message} occured`})
    }
  };
}
