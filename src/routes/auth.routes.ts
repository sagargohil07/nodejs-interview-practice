import { Router } from "express";
import authController from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/check", authMiddleware, (req, res) => {
  res.send().json("auht middleware check");
});

export default authRoutes;
