import { Router} from "express";
import { SetPassword, UpdatePassword } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const adminRoutes = new Router();

adminRoutes.post("/setpassword",verifyToken,  SetPassword) ;
adminRoutes.put("/updatepassword", verifyToken, UpdatePassword);

export default adminRoutes;