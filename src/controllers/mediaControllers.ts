import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Media, { IMedia } from "../models/media";

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dxy33wiax",
  api_key: "991555379284442",
  api_secret:"ekuY9MDxVtiIeUGqKbLS0V8MTV4",
});

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const { type, content, youtubeUrl, link } = req.body;
    let file = req.files?.file;
    let thumbnail = req.files?.thumbnail;

    if (!file && type === "image") {
      return res.status(400).json({ error: "No image file provided." });
    }

    if (!thumbnail && type === "video") {
      return res.status(400).json({ error: "No thumbnail file provided." });
    }

    let uploadResult, thumbnailResult;

    if (file) {
      // @ts-ignore
      uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",
      });
    }

    if (thumbnail) {
      thumbnailResult = await cloudinary.uploader.upload(
        // @ts-ignore
        thumbnail.tempFilePath,
        {
          resource_type: "image",
        }
      );
    }

    const newMedia: IMedia = new Media({
      type,
      content,
      url: uploadResult ? uploadResult.secure_url : null,
      publicId: uploadResult ? uploadResult.public_id : null,
      thumbnailUrl: thumbnailResult ? thumbnailResult.secure_url : null,
      youtubeUrl: type === "video" ? youtubeUrl : null,
      link,
      format: uploadResult ? uploadResult.format : null,
    });

    await newMedia.save();

    res.status(201).json({
      message: "Media uploaded successfully",
      media: newMedia,
    });
  } catch (error: any) {
    console.error("Error in uploadMedia:", error);
    res.status(500).json({
      error: `An error occurred while uploading the media. ${error}`,
    });
  }
};

// Other methods (getAllMedia, getMediaById, deleteMedia) remain unchanged

export const getAllMedia = async (req: Request, res: Response) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json(media);
  } catch (error) {
    console.error("Error in getAllMedia:", error);
    res.status(500).json({ error: "An error occurred while fetching media." });
  }
};

export const getMediaById = async (req: Request, res: Response) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: "Media not found." });
    }
    res.status(200).json(media);
  } catch (error) {
    console.error("Error in getMediaById:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the media." });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: "Media not found." });
    }

    // Delete from Cloudinary
    if (media.publicId) {
      await cloudinary.uploader.destroy(media.publicId);
    }

    // Delete thumbnail if exists
    if (media.thumbnailUrl) {
      const thumbnailPublicId = media.thumbnailUrl
        .split("/")
        .pop()
        ?.split(".")[0];
      if (thumbnailPublicId) {
        await cloudinary.uploader.destroy(thumbnailPublicId);
      }
    }

    // Delete from database
    await Media.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMedia:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the media." });
  }
};

// mediaRoutes.ts
