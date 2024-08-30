import { Request, Response } from "express";
import Course from "../models/Course";


export class CourseController {
  static NewCourse = async (req: Request, res: Response) => {
    const { title, image,rating } = req.body;
    try {
      await Course.create({ title, rating, image });
      res.status(200).json({ message: "course Added" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static getAll = async (req: Request, res: Response) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
  static update = async (req: Request, res: Response) => {
    try {
      const courseId = req.params.id;
      const data = req.body;
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(400).json({ message: "course not found" });
      }
      await Course.findByIdAndUpdate(courseId, data);
      res.status(200).json({ message: "course updated" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message}` });
    }
  };
  static delete = async (req: Request, res: Response) => {
    try {
      const courseId = req.params.id;
      await Course.findByIdAndDelete(courseId);
      res.status(200).json({ message: "course deleted" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} occured` });
    }
  };
}
