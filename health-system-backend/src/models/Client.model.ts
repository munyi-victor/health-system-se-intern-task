// import mongoose functions and the client interface
import { Schema, model } from "mongoose";
import { IClient } from "../types";

// create the client schema
const ClientSchema: Schema = new Schema<IClient>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    nationalId: {
      type: String,
      required: [true, "National ID is required"],
      unique: true,
    },
    age: {
      type: Number,
      required: [true, "National ID is required"],
    },
    gender: {
      type: String,
      required: [true, "National ID is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    enrolledPrograms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
  },
  { timestamps: true }
);

const Client = model<IClient>("Client", ClientSchema);

export default Client;