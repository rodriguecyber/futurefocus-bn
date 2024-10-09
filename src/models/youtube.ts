import { model, Schema } from "mongoose";
import { CourseTypes } from "../types/Types";

const VideoSchema = new Schema({
  url: { type: String, required: true },
});
const Video = model("YoutubeVideo", VideoSchema);
export default Video;
