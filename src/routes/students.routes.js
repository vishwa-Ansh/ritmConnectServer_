import { Router } from "express";

import { verifyToken } from "../middleware/authMiddleware.js";

import * as studentController from "../controllers/studentController.js";

import { upload } from "../middleware/multerMiddleware.js";

const routes = Router();

routes.post(
  "/profile",
  verifyToken,
  studentController.createStudentProfile
);

routes.get(
  "/get_profile",
  verifyToken,
  studentController.get_profile
);

routes.post(

  "/upload-profile-photo",

  verifyToken,

  upload.single("profilePhoto"),

  studentController.uploadProfilePhoto

);
routes.get("/materials", verifyToken, studentController.GetUploadedMaterials);

export default routes;