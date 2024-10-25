import { model, Schema } from "mongoose";
import { Contact, CourseTypes } from "../types/Types";

const ContactSchema = new Schema<Contact>({
  location: {type:[String]},
  socialMedias:{type:[Object]},
  contact: [Number],
  emails: [String],

  
});
const Contact = model<CourseTypes>("Contact", ContactSchema);
export default Contact;
