import { Request, Response } from "express"
import { Institution } from "../models/institution"
import { Access } from "../models/Access"
import { AccessPayment } from "../models/accessPayment"
import Team from "../models/Team"

export class InstitutionControllers{
    static register = async(req:Request,res:Response)=>{
        try {
            const {name,email,phone,logo} = req.body
            const inst  = await Institution.findOne({name,email})
            if(inst){
        return res.status(400).json({message:"Institution already exists"})
                
            }
       const newInst =  await Institution.create({name,email,phone,logo})
        await Team.create({institution:newInst._id,name,email,phone,isAdmin:true,image:'hhh',position:"Admin"})
        res.status(201).json({message:"Institution created successfully"})
        } catch (error) {
            res.status(500).json({message:"internal server error"})
            console.log(error)
        }

        }
    static all = async(req:Request,res:Response)=>{
        try {
            const inst  = await Institution.find()
    
        res.status(201).json({inst})
        } catch (error) {
            res.status(500).json({message:"internal server error"})
        }

        }
static verify = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const inst = await Institution.findById(id)
        if(!inst){
            return res.status(404).json({message:"Institution not found"})
            }
            if(inst.verified){
                return res.status(200).json({message:"Institution already verified"})
            }
             inst.verified =true
             await Access.create({institution:inst._id})
             await inst.save()
    } catch (error) {
            res.status(500).json({ message: "internal server error" });
        
    }

}
static activate = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const {amount,duration} = req.body
        const inst = await Institution.findById(id)
        if(!inst){
            return res.status(404).json({message:"Institution not found"})
        }
      await AccessPayment.create({institution:inst._id,amount})
      await Access.findOneAndUpdate({institution:id},{$inc:{duration}})
      const accesInst =  await  Access.findOne({institution:inst._id})
            if(!accesInst){
                return res.status(400).json({message:"record not found"})
            }
        
    } catch (error) {
            res.status(500).json({ message: "internal server error" });
        
    }

}

static addfeature = async(req:Request,res:Response)=>{
    try {
        const {features,institution} =req.body
         await Access.findOneAndUpdate({institution},{$push:{features}})
       res.status(200).json({message:"feature added succesfuly"})
    } catch (error) {
            res.status(500).json({ message: "internal server error" });
        
    }
}



    }
