import { verifyToken } from "../middleware/authMiddleware.js";
import { Router } from "express";
import * as teacherController from "../controllers/teacherController.js"
const routes = new Router();
import { upload } from "../middleware/multerMiddleware.js";
import { telegramUpload } from "../middleware/telegramMulter.js";

routes.get("/getCompleteProfileDetails", verifyToken,teacherController.GetCompleteProfileDetails);
routes.post('/createTeacherProfileData', verifyToken, teacherController.CreateCompleteTeacherProfileData);
routes.get('/students-images/:sem', verifyToken,teacherController.getAllStudentProfilePhoto)
routes.get('/studentProfile/:rollNumber',verifyToken,teacherController.StudentProfileDetails)


// routes.post("/upload",verifyToken, telegramUpload.single("file"),teacherController.DocumentUploads)

routes.post(
  "/upload",
  (req,res,next)=>{
    console.log("STEP 1 ROUTE HIT");
    next();
  },
  verifyToken,
  telegramUpload.single("file"),
  teacherController.DocumentUploads
);


routes.get("/getSubject",verifyToken,teacherController.GetAllSubject)
 export default routes;

//  -----------------------------------------------------
routes.get(
  "/materials",
  verifyToken,
  teacherController.GetUploadedMaterials
);

routes.get(
  "/materials/:id/download",
  
  teacherController.DownloadMaterial
);