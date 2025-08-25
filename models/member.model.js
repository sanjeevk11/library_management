import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
});

export default mongoose.model("Member", memberSchema);
