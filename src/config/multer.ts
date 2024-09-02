import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dxy33wiax",
  api_key: process.env.CLOUDINARY_KEY || "991555379284442",
  api_secret: process.env.CLOUDINARY_SECRET || 'ekuY9MDxVtiIeUGqKbLS0V8MTV4',
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    //@ts-ignore
    folder: "uploads", // Folder where images will be stored in Cloudinary
    //@ts-ignore
    format: async (req, file) => "jpg", // Supports promises as well
    public_id: (req, file) => Date.now().toString(), // Unique filename
  },
});

const upload = multer({ storage });

// Export the middleware
export { upload };
