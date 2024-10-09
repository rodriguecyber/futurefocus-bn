import { model, Schema } from "mongoose";

const VideoSchema = new Schema({
  url: { type: String, required: true },
  type: { type: String, required: true,enum:['video','beat'] },
});
const Video = model("YoutubeVideo", VideoSchema);
export default Video;
