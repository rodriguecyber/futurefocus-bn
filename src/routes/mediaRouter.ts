import express from "express";
import {
  uploadMedia,
  updateMedia,
  deleteMedia,
  getMedia,
  getVideos,
  postVideos,
  deleteVideos,
} from "../controllers/mediaControllers";
import upload from "../middleware/upload.middleware";
 

const MediRouters = express.Router();

MediRouters.post("/", upload.single('file'), uploadMedia);
MediRouters.put("/:id", upload.single("file"), updateMedia);
MediRouters.delete("/:id", deleteMedia);
MediRouters.get("/", getMedia);
MediRouters.get("/youtube", getVideos);
MediRouters.delete("/youtube/:id", deleteVideos);
MediRouters.post("/youtube", postVideos);

export default MediRouters;
 