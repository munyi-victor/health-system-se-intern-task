// import mongoose functions and the doctor interface
import { Schema, model } from "mongoose";
import { IDoctor } from "../types";

// import bcrypt(for hashing and comparing password)
import bcrypt from "bcryptjs";

// create the doctor schema
const doctorSchema = new Schema<IDoctor>({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// compare password method
doctorSchema.methods.matchPassword = async function (enteredPassword: any) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// hash password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Doctor = model<IDoctor>("Doctor", doctorSchema);
export default Doctor;