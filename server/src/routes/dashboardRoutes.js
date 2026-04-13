import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Hanya Admin yang boleh melihat statistik dashboard
router.get("/stats", verifyToken, isAdmin, getDashboardStats);

export default router;