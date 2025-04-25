import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Doctor from "../models/Doctor.model";
import generateJwtToken from "../utils/generateJwtToken";

const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * @desc    Register a new doctor
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerDoctor = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, username, email, and password.");
  }

  // check if doctor already exists
  const doctorExists = await Doctor.findOne({ username });
  if (doctorExists) {
    res.status(400);
    throw new Error("Doctor already exists.");
  }

  // create doctor
  const doctor = await Doctor.create({
    fullName,
    username,
    email,
    password,
  });

  if (doctor) {
    // generate JWT token
    const token = generateJwtToken(res, doctor._id.toString());
    res.status(201).json({
      doctor: {
        id: doctor._id,
        fullName: doctor.fullName,
        username: doctor.username,
        email: doctor.email,
        token,
      },
    });
  } else {
    res.status(500);
    throw new Error("Failed to register doctor.");
  }
});

/**
 * @desc    Log in a doctor and return JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginDoctor = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required.");
  }
  // check if doctor exists
  const doctor = await Doctor.findOne({ username });
  if (!doctor) {
    res.status(401);
    throw new Error("Doctor not found.");
  } else if (doctor && (await doctor.matchPassword(password))) {
    // generate JWT token
    const token = generateJwtToken(res, doctor._id.toString());
    res.json({
      _id: doctor._id,
      fullName: doctor.fullName,
      username: doctor.username,
      email: doctor.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password.");
  }
});

/**
 * @desc    Log out a doctor and return JWT
 * @route   GET /api/auth/logout
 * @access  Private
 */
export const logoutDoctor = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("connect.sid", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged Out Successfully",
  });
});