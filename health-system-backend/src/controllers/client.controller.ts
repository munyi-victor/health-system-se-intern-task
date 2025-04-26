// import express types, client and program models
import { Request, Response } from "express";
import Client from "../models/Client.model";
import Program from "../models/Program.model"; // to help us enroll a client to a program
import asyncHandler from "express-async-handler";

/**
 * @desc   Register a new client
 * @route  POST /api/clients/register
 */
export const registerClient = asyncHandler(async (req: any, res: any) => {
  try {
    const { firstName, lastName, nationalId, age, gender, phone } = req.body;

    if (!firstName || !lastName || !nationalId || !age || !gender || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // check if the client already exists
    const exists = await Client.findOne({ nationalId });
    if (exists) {
      return res.status(409).json({ message: "Client already exists." });
    }

    // register a client to the db
    const client = await Client.create({ firstName, lastName, nationalId, age, gender, phone });
    res.status(201).json(client);
  } catch (err) {
    console.error("Register client error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

/**
 * @desc   Enroll client into one or more programs
 * @route  POST /api/clients/:id/enroll
 */
export const enrollClient = asyncHandler(async (req: any, res: any) => {
  try {
    const clientId = req.params.id;
    const { programIds } = req.body; // expects array of program ObjectIds

    if (!programIds || !Array.isArray(programIds)) {
      return res.status(400).json({ message: "programIds must be an array." });
    }

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: "Client not found." });

    // Validate each program id
    const validPrograms = await Program.find({ _id: { $in: programIds } });
    if (validPrograms.length !== programIds.length) {
      return res.status(400).json({ message: "One or more invalid program IDs." });
    }

    // Prevent duplicate enrollments
    const uniqueProgramIds = programIds.filter(
      (id: string) => !client.enrolledPrograms.includes(id as any)
    );

    client.enrolledPrograms.push(...uniqueProgramIds);
    await client.save();

    res.status(200).json(client);
  } catch (err) {
    console.error("Enroll error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

/**
 * @desc   Search clients by first or last name
 * @route  GET /api/clients/search?q=term
 */
export const searchClients = asyncHandler(async (req: any, res: any) => {
  try {
    const query = req.query.q as string;

    if (!query) return res.status(400).json({ message: "Query is required." });

    const clients = await Client.find({
      $or: [
        { firstName: new RegExp(query, "i") },
        { lastName: new RegExp(query, "i") },
      ],
    });

    res.status(200).json(clients);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

/**
 * @desc   Get all clients with enrolled programs
 * @route  GET /api/clients/
 */
export const getAllClients = asyncHandler(async (req: any, res: any) => {
  try {
    const clients = await Client.find().populate("enrolledPrograms");

    if (!clients) return res.status(404).json({ message: "No clients found." });

    res.status(200).json(clients);
  } catch (err) {
    console.error("Fetch clients error:", err);
    res.status(500).json({ message: "Server error." });
  }
});


/**
 * @desc   Get full client profile with enrolled programs
 * @route  GET /api/clients/:id
 */
export const getClientProfile = asyncHandler(async (req: any, res: any) => {
  try {
    const client = await Client.findById(req.params.id).populate("enrolledPrograms");

    if (!client) return res.status(404).json({ message: "Client not found." });

    res.status(200).json(client);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error." });
  }
});
