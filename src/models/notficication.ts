import mongoose, { Schema } from "mongoose";

const notificationSchema= new mongoose.Schema({
    user: {type:Schema.Types.ObjectId, required:true,ref:"Team"},
    notification:{type:String,required:true},
    isRead:{type:Boolean,required:true, default:false}

},{
    timestamps:true
})
export const Notification= mongoose.model('notification',notificationSchema)
