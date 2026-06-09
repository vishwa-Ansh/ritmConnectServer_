import { Router } from "express";
import * as authController from "../controllers/authController.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post("/register", authController.UserRegister);
routes.get("/get-users", authController.getUsers);
routes.post("/login", authController.login);
routes.get("/refresh-token", authController.refresh);

export default routes;
