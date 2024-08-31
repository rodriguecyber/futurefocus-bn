import express from "express";
import * as mediaController from '../controllers/mediaControllers'
import fileUpload from "express-fileupload";

const router = express.Router();

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

router.post("/upload", mediaController.uploadMedia);
router.get("/", mediaController.getAllMedia);
router.get("/:id", mediaController.getMediaById);
router.delete("/:id", mediaController.deleteMedia);

export default router;
