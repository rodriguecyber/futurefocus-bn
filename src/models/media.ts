import mongoose, { Document, Schema } from "mongoose";

export interface IMedia extends Document {
  type: "image" | "video";
  url: string;
  content?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Media = mongoose.model<IMedia>("Media", MediaSchema);
