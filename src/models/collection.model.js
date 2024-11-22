import mongoose from "mongoose";
var Schema = new mongoose.Schema({
  name: String,
  year: String,
  department: String,
  phone: Number,
  email: String,
  college: String,
  password: String,
});

export const collection = mongoose.model("collection", Schema);