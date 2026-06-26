import { Router} from "express";
import { SetPassword, UpdatePassword , getPermissionKey} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const adminRoutes = new Router();

adminRoutes.post("/setpassword",verifyToken,  SetPassword) ;
adminRoutes.put("/updatepassword", verifyToken, UpdatePassword);
adminRoutes.post('/getpassword/:section', verifyToken, getPermissionKey);

export default adminRoutes;