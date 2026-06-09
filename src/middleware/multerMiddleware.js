import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,

    params: async (req, file) => {

        const docType = req.params.docType;

        let folderName = "others";

        let resourceType = "raw";

        if (docType === "pdf") {
            folderName = "ritmconnect/pdfs";
            resourceType = "raw";
        }

        else if (docType === "video") {
            folderName = "ritmconnect/videos";
            resourceType = "video";
        }

        else if (docType === "notes") {
            folderName = "ritmconnect/notes";
            resourceType = "raw";
        }

        else if (file.mimetype.startsWith("image")) {
            folderName = "ritmconnect/images";
            resourceType = "image";
        }

        return {
            folder: folderName,

            resource_type: resourceType,

            public_id: Date.now() + "-" + file.originalname,
        };
    },
});

export const upload = multer({
    storage,
      limits: {

      fileSize: 100 * 1024 * 1024,

   },
});