import { Request, Response } from "express";
import Course from "../models/Course";


export class CourseController {
  static NewCourse = async (req: Request, res: Response) => {
    const { title, image, rating, nonScholarship, scholarship } = req.body;
    try {
      const last_item = await Course.findOne().sort({order:-1})
      const next_index = last_item?last_item.order+1:1
      await Course.create({
        title,
        rating,
        image,
        nonScholarship,
        scholarship,
        order:next_index
      });
      res.status(200).json({ message: "course Added" });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} Occured` });
    }
  };
  static getAll = async (req: Request, res: Response) => {
    try {
      const courses = await Course.find().populate('shifts');
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
  static activate = async (req: Request, res: Response) => {
    try {
      const courseId = req.params.id;
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(400).json({ message: "course not found" });
      }
      await Course.findByIdAndUpdate(courseId, {active:!course.active});
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
  static addShift = async(req:Request,res:Response)=>{
    const {id} = req.params
    const  {shift} = req.body
    try {
      const course =await Course.findById(id)
      if(!course){
        return res.status(400).json({message:"course not found"})
      }
      if(course.shifts.includes(shift)){
       return  res.json(400).json({message:"shift available"})
      }
      course.shifts.push(shift)
      await course.save()
      res.json(200).json({message:"shift added"})
    } catch (error:any) {
      res.status(500).json({message:`Error ${error.message} occured`})
    }

  }
  static reorder = async (req: Request, res: Response) => {
    try {
      const courseId = req.params.id;
      const { index } = req.body;
    
      const lastItem = await Course.findOne().sort({ order: -1 });
      
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(400).json({ message: "Course not found" });
      }
    
      const course1 = await Course.findOne({ order: index });
      
      if (course1) {
        course1.order = course.order || lastItem?.order || 1; 
        await course1.save(); 
    
        course.order = index;
      } else {
        course.order = index;
      }
    
      await course.save();
    
      res.status(200).json({ message: "Course index updated successfully" });
    
    } catch (error:any) {
      res.status(500).json({ message: `Error: ${error.message} occurred` });
    }
    
  };
 
   
}