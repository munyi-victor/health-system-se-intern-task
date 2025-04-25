// import express types, and the Program model
import { Request, Response } from "express";
import Program from "../models/Program.model";
import asyncHandler from "express-async-handler";

/**
 * @desc   Create a new health program
 * @route  POST /api/programs
 */
export const createProgram = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  // check if program already exists
  const existing = await Program.findOne({ name });
  if (existing) {
    res.status(409);
    throw new Error("Program already exists.");
  }

  // create the program
  const program = await Program.create({ name, description });

  res.status(201).json(program);
});

/**
 * @desc   Get all health programs
 * @route  GET /api/programs
 */
export const getPrograms = asyncHandler(async (_req: Request, res: Response) => {
  const programs = await Program.find().sort({ createdAt: -1 });
  res.status(200).json(programs);
});
