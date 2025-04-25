import express from "express";
import { loginDoctor, logoutDoctor, registerDoctor } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login as a doctor and receive JWT token
 * @access  Public
 */
router.post("/login", loginDoctor);

/**
 * @route   GET /api/auth/logout
 * @desc    Logout a doctor and receive JWT token
 * @access  Private
 */
router.get("/logout", protect, logoutDoctor);

/**
 * @route   POST /api/auth/register
 * @desc    Register as a doctor and receive JWT token
 * @access  Public
 */
router.post("/register", registerDoctor);

export default router;
