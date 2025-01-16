import { Request, Response } from "express"
import { Institution } from "../models/institution"
import { Access } from "../models/Access"
import { AccessPayment } from "../models/accessPayment"
import Team from "../models/Team"
import mongoose, { Types } from "mongoose"
import { notifyInstuEmail } from "../utils/emailTemplate"
import { sendEmail } from "../utils/sendEmail"

export class InstitutionControllers {
    static register = async (req: Request, res: Response) => {
        try {
            const { name, email, phone } = req.body
            const inst = await Institution.findOne({$or:[{email},{phone}]})
            const adm =await Team.findOne({email})
            if (inst||adm) {
                return res.status(400).json({ message: "Institution already exists" })

            }

            if(!req.file){
                res.status(400).json({ message: "please upload your logo" });
                return
                
            }
            const logo = req.file.path
            const newInst = await Institution.create({ name, email, phone, logo })
            
            await Team.create({ institution: newInst._id, name, email, phone, isAdmin: true, image: 'hhh', position: "Admin" })
        const mailOptions = {
              from: process.env.OUR_EMAIL as string,
              to: email,
              subject: "Registered",
              html: notifyInstuEmail(name),
            };
            res.status(201).json({ message: "Institution created successfully" })
            await sendEmail(mailOptions)
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
        }

    }
    static all = async (req: Request, res: Response) => {
        try {
            const inst = await Institution.find()

            res.status(201).json({ inst })
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
        }

    }
    static verify = async (req: Request, res: Response) => {
        try {
            const {id} = req.body
            const inst = await Institution.findById(id)
            if (!inst) {
                return res.status(404).json({ message: "Institution not found" })
            }
            if (inst.verified) {
                return res.status(200).json({ message: "Institution already verified" })
            }
            inst.verified = true
            await Access.create({ institution: inst._id })
            await inst.save()

        } catch (error) {
            res.status(500).json({ message: "internal server error" });

        }

    }
    static activateAllFeatures = async (req: Request, res: Response) => {
        try {
            const { amount, months,id } = req.body
            const inst = await Institution.findById(id)
            if (!inst) {
                return res.status(404).json({ message: "Institution not found" })
            }
            await AccessPayment.create({ institution: inst._id, amount })
            const accesInst = await Access.findOneAndUpdate({ institution: id }, { $inc: { months } })
            if (!accesInst) {
                return res.status(400).json({ message: "no acces found! contact support team" })
            }
            const updatedFeatures = accesInst.features.map((feature) => {
                return ({ ...feature, active: true, lastUpdated: new Date(Date.now()), dueDate: new Date(feature.dueDate.setMonth(feature.dueDate.getMonth() + months)) })
            })
            accesInst.features = updatedFeatures
            await accesInst.save()

        } catch (error) {
            res.status(500).json({ message: "internal server error" });

        }

    }
    static activateSomeFeatures = async (req: Request, res: Response) => {
        try {
            const { amount, months,id,features } = req.body
            const inst = await Institution.findById(id)
            if (!inst) {
                return res.status(404).json({ message: "Institution not found" })
            }
            await AccessPayment.create({ institution: inst._id, amount })
            const accesInst = await Access.findOneAndUpdate({ institution: id }, { $inc: { months } })
            if (!accesInst) {
                return res.status(400).json({ message: "no acces found! Contact Support Team" })
            }
            const updatedFeatures = accesInst.features.filter((feature)=>features.includes(feature.feature) ).map((feature) => {
                return ({ ...feature, active: true, lastUpdated: new Date(Date.now()), dueDate: new Date(feature.dueDate.setMonth(feature.dueDate.getMonth() + months)) })
            })
            accesInst.features = updatedFeatures
            await accesInst.save()

        } catch (error) {
            res.status(500).json({ message: "internal server error" });

        }

    }

    static addfeature = async (req: Request, res: Response) => {
        try {
            const { features, institution } = req.body
            const access = await Access.findOneAndUpdate({ institution })
            if (!access) {
                return res.status(400).json({ message: "no acces found! contact support team" })
            }
            features.forEach((feature: Types.ObjectId) => access.features.push({
                feature: feature ,
                active: false,
                dueDate: new Date(Date.now())
            }))
            res.status(200).json({ message: "feature added succesfuly" })
        } catch (error) {
            res.status(500).json({ message: "internal server error" });

        }
    }



}
