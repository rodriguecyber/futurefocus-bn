import { Request, Response } from "express";
import Feature from "../models/Feature";
import Permission from "../models/Permission";
import Role from "../models/role";
import { permission } from "process";
import Admin from "../models/Admin";

export class PermissionCointroller {
  static AddFeature = async (req: Request, res: Response) => {
    try {
      const { feature, web } = req.body;
      await Feature.create({ feature, web });
      res.status(201).json({ message: `feature  created` });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static ViewFeature = async (req: Request, res: Response) => {
    try {
      const features = await Feature.find();
      res.status(200).json(features);
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static AddRole = async (req: Request, res: Response) => {
    try {
      const { role } = req.body;
      await Role.create({ role });
      res.status(201).json({ message: `role created` });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static viewRole = async (req: Request, res: Response) => {
    try {
      const roles = await Role.find().populate("permission");
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static AddPermission = async (req: Request, res: Response) => {
    try {
      const { permission, feature } = req.body;
      await Permission.create({ permission, feature });
      res.status(201).json({ message: `rpermission created` });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static ViewPermission = async (req: Request, res: Response) => {
    try {
      const permissions = await Permission.find().populate("feature");
      res.status(200).json(permissions);
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static assignPermisson = async (req: Request, res: Response) => {
    try {
      const { roleId } = req.params;
      const { permissions } = req.body;
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(400).json({ message: "role not found" });
      }
      if (!Array.isArray(permissions)) {
        console.log(permissions);
        return res
          .status(400)
          .json({ message: "Permissions must be an array" });
      }
      role.permission = permissions;
      await role.save();
      res.status(200).json({ message: "permission assigned to role" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static assignRole = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      const user = await Admin.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }

      user.role = role;
      await user.save();
      res.status(200).json({ message: "role assigned to user" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
}