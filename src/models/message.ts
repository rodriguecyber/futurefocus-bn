import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    subject:{type:String,required:true},
    status: { type: String, required: true, enum:["read", "unread"], default:"unread" },
  },
  {
    timestamps: true,
  },
);

const Message = model('Message', messageSchema);
export default Message;