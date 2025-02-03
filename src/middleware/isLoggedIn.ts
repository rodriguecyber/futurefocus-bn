import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/token";
import Team from "../models/Team";

export const isloggedIn = async (req: any, res: Response,next:NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "token not found" });
      }

      const id = await decodeToken(token)._id;
      
      if (!id) {
        return res.status(401).json({ message: "user not authenticated" });
      }
      const user = await Team.findById(id);
      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      req.loggedUser = user;
      
      next();
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Erro occurred: ${error.message}` });
    }
  };
