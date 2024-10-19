import { model, Schema } from "mongoose";
import { TaskTypes, CommentTypes, ReplyTypes } from "../types/Types";

export const taskSchema = new Schema<TaskTypes>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  endTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "started", "completed"],
    default: "pending",
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  startTime: {
    type: Date,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
export const Task = model<TaskTypes>("Task", taskSchema);

export const commentSchema = new Schema<CommentTypes>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
});
export const Comment = model<CommentTypes>("Comment", commentSchema);

export const replySchema = new Schema<ReplyTypes>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});
export const Reply = model<ReplyTypes>("Reply", replySchema);