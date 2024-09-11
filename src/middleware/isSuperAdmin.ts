import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/token";

export const isSuperAdmin = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "error! if persist login again" });
      }

      const user = await decodeToken(token);
      if (!user) {
                return res
                  .status(401)
                  .json({ message: "error! if persist login again" });

      }
      if (user.role !== "superadmin") {
        return res.status(403).json({ message: "only super admin allowed" })
      }
      next()
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${error.message}` });
    }
  };