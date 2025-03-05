import express from "express";
import {
  registerUser,
  loginUser,
  getUserRole,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/role", authMiddleware, getUserRole);

export default router;
