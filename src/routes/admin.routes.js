import { Router} from "express";
import { SetPassword } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const adminRoutes = new Router();

adminRoutes.post("/setpassword",verifyToken,  SetPassword) ;

export default adminRoutes;