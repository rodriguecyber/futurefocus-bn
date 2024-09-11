import { Request, Response } from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Media } from "../models/media";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY || '991555379284442',
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Define the folder for uploadss
const CLOUDINARY_FOLDER = "media_uploads";

// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    //@ts-ignore
    folder: CLOUDINARY_FOLDER,
    allowed_formats: ["jpg", "png", "jpeg", "gif", "mp4", "avi"],
  },
});

const upload = multer({ storage });

// Controller to handle media upload
export const uploadMedia = async (req: Request, res: Response) => {
  try {
    const { type, content, videoUrl } = req.body;
    let fileUrl = "";

    if (req.file) {
      // Use the Cloudinary URL provided by multer-storage-cloudinary
      fileUrl = req.file.path;
    } else {
      return res.status(400).json({ message: "File is required." });
    }

   

    const media = new Media({
      type,
      url: fileUrl,
      content,
      videoUrl: type === "video" ? videoUrl : undefined,
    });

    await media.save();
    res.status(201).json(media);
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ message: "Error uploading media", error });
  }
};

// Controller to handle media update
export const updateMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, content, videoUrl, thumbnailUrl } = req.body;

    const updates: any = {
      type,
      content,
      videoUrl: type === "video" ? videoUrl : undefined,
      thumbnailUrl: type === "video" ? thumbnailUrl : undefined,
    };

    if (req.file) {
      // Use the Cloudinary URL provided by multer-storage-cloudinary
      updates.url = req.file.path;
    }

    const media = await Media.findByIdAndUpdate(id, updates, { new: true });
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.json(media);
  } catch (error) {
    console.error("Error updating media:", error);
    res.status(500).json({ message: "Error updating media", error });
  }
};

// Controller to handle media deletion
export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const media = await Media.findByIdAndDelete(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ message: "Error deleting media", error });
  }
};

// Controller to get all media
export const getMedia = async (req: Request, res: Response) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ message: "Error fetching media", error });
  }
};

// Export the upload middleware for use in routes
export { upload };