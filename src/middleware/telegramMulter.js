import multer from "multer"
import path from "path";

// const storage = multer.diskStorage({

// })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName =
           path.parse(file.originalname).name + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});
export const telegramUpload = multer({
    storage,
    limits: {
        fileSize: 200 * 1024 * 1024,
    },
});