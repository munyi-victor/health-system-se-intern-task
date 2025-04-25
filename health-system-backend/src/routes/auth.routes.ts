import express from "express";
import { loginDoctor, registerDoctor } from "../controllers/auth.controller";

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login as a doctor and receive JWT token
 * @access  Public
 */
router.post("/login", loginDoctor);
router.post("/register", registerDoctor);

export default router;
