import mongoose, { Document, Schema } from "mongoose";

export interface IMedia extends Document {
  type: "image" | "video";
  content: string;
  url: string;
  publicId: string;
  thumbnailUrl?: string;
  youtubeUrl?: string;
  link?: string;
  format: string;
  createdAt: Date;
}

const mediaSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    default: null,
  },
  youtubeUrl: {
    type: String,
    default: null,
  },
  link: {
    type: String,
    default: null,
  },
  format: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IMedia>("Media", mediaSchema);
