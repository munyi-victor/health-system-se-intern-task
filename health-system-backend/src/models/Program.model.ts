// import mongoose functions and the program interface
import { Schema, model } from "mongoose";
import { IProgram } from "../types";

// create the Program schema
const ProgramSchema: Schema = new Schema<IProgram>(
  {
    name: {
      type: String,
      required: [true, "Program name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Program description is required"],
    },
  },
  { timestamps: true }
);

const Program = model<IProgram>("Program", ProgramSchema);

export default Program;