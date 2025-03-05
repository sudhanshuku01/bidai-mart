import express from "express";
import { getAdminDashboardStats } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard-stats", authMiddleware, isAdmin, getAdminDashboardStats);

export default router;
