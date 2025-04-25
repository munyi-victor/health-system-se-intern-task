import express from "express";
import {
  registerClient,
  enrollClient,
  searchClients,
  getAllClients,
  getClientProfile,
} from "../controllers/client.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @route   POST /api/clients
 * @desc    Register a new client (patient)
 * @access  Private (Doctor only)
 */
router.post("/register", protect, registerClient);

/**
 * @route   POST /api/clients/:id/enroll
 * @desc    Enroll client in one or more health programs
 * @access  Private
 */
router.post("/:id/enroll", protect, enrollClient);

/**
 * @route   GET /api/clients/search?name=John
 * @desc    Search for clients by name
 * @access  Private
 */
router.get("/search", protect, searchClients);

/**
 * @route   GET /api/clients/:id
 * @desc    View a client's profile (including enrolled programs)
 * @access  Private
 */
router.get("/", protect, getAllClients);

/**
 * @route   GET /api/clients/:id
 * @desc    View a client's profile (including enrolled programs)
 * @access  Private
 */
router.get("/:id", protect, getClientProfile);

export default router;
