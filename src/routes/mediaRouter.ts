import express from "express";
import {
  uploadMedia,
  updateMedia,
  deleteMedia,
  getMedia,
  getVideos,
  postVideos,
} from "../controllers/mediaControllers";
import { upload } from "../config/multer"; 

const MediRouters = express.Router();

MediRouters.post("/", upload.single('file'), uploadMedia);
MediRouters.put("/:id", upload.single("file"), updateMedia);
MediRouters.delete("/:id", deleteMedia);
MediRouters.get("/", getMedia);
MediRouters.get("/youtube", getVideos);
MediRouters.post("/youtube", postVideos);

export default MediRouters;
 