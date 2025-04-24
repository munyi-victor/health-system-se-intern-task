// import mongoose function
import { Schema } from "mongoose";

// Interface for a doctor
export interface IDoctor extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  matchPassword(password: string): Promise<boolean>;
}

// Interface for a health program
export interface IProgram extends Document {
  name: string;
  description: string;
}

// Interface for a client or patient
export interface IClient extends Document {
  firstName: string;
  lastName: string;
  nationalId: string;
  age: number;
  gender: string;
  phone: number;
  enrolledPrograms: Schema.Types.ObjectId[]; // References Program model
}