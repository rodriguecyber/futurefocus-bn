import { model, Schema } from "mongoose";
interface subscriber{
    email:string,
}

const SubscriberSchema = new Schema<subscriber>({
  
  email: { type: String, required: true },
 
});
const Subscriber = model<subscriber>("Subscriber", SubscriberSchema);
export default Subscriber;
