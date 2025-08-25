import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  copies: Number,
  available_copies: Number,
});


export default mongoose.model("Book", bookSchema);
