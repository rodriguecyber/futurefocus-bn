
import { Request, Response } from "express";
import Message from "../models/message";

export class messageController { 
    static Report=async(req:Request,res:Response)=>{
        const {email,message,nme,phone,subject} =req.body;
        try {
          await Message.create({email,message,name,phone,subject});
          res.status(200).json({ message: 'message sent' });
         
        } catch (error) {
          res.status(500).json({ message: 'internal server error',error });
            
        }
    }
    static getMessage= async(req:Request,res:Response)=>{
        try {
           const incidence = await Message.find()
          res.status(200).json(incidence);
           
        } catch (error) {
          res.status(200).json({ message: 'internal server error' });
            
        }
    }
    static MarkRead =async (req:Request, res:Response)=>{
      const {id}= req.params
      try {
        await Message.findByIdAndUpdate(id,{status:"read"})
      } catch (error) {
          res.status(500).json({ message: 'internal server error' });
        
      }
    }
}
