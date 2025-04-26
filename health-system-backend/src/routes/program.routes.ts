import express from "express";
import {
  createProgram,
  getPrograms,
  searchPrograms,
} from "../controllers/program.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @route   POST /api/programs
 * @desc    Create a new health program (e.g., HIV, TB)
 * @access  Private (Doctor only)
 */
router.post("/", protect, createProgram);

/**
 * @route   GET /api/programs
 * @desc    Get all available health programs
 * @access  Private
 */
router.get("/", protect, getPrograms);

/**
 * @route   GET /api/programs/search?q=Malaria
 * @desc    Search for clients by name ordescription
 * @access  Private
 */
router.get("/search", protect, searchPrograms);

export default router;
