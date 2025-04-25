import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Doctor from "../models/Doctor.model";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

/**
 * @desc   Middleware to protect private routes
 * @access Private
 */
export const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      req.user = await Doctor.findById(decoded.doctorId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
