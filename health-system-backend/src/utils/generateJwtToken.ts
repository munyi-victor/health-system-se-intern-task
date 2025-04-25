import { Response } from "express";
import jwt from "jsonwebtoken";

const generateJwtToken = (res: Response, doctorId: string) => {
  const token = jwt.sign({ doctorId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateJwtToken;
