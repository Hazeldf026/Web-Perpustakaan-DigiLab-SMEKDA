import express from "express";
import { register, login, forgotPassword, checkResetStatus, checkRegistrationStatus } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/registration-status/:identifier", checkRegistrationStatus);
router.post("/forgot-password", forgotPassword);
router.get("/reset-status/:identifier", checkResetStatus);

export default router;