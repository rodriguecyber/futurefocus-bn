import { Request, Response } from "express"; 
import { sendMessage } from "../utils/sendSms";

export const testController = async(req:Request,res:Response)=>{
    try {
      const {message,recipients} = req.body
      await sendMessage(message,recipients)
        res.status(200).json({message:"done"});

    } catch (error) {
        res.status(500).json(error)
    }
}