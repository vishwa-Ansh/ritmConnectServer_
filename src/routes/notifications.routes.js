import express from "express";
import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import * as NotificationsControllers from "../controllers/NotificationsController.js"
const routes=Router();

routes.post('/SavePushToken', verifyToken, NotificationsControllers.SavePushToken)

export default routes;