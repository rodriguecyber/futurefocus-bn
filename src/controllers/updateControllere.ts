// import { Request, Response } from "express";
// import Payment from "../models/payment";

// export const payment = async(req:Request,res:Response)=>{
//     try {
//        const payment =  await Payment.find().populate('studentId')
//       payment.forEach((pay)=>{
//         if(!pay.studentId){
//        console.log('payent',pay)
//         }
//       })
//         res.status(200).json({message:"done"});

//     } catch (error) {
//         res.status(500).json(error)
//     }
// }