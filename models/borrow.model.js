import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  member_id: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  borrow_date: { type: Date, default: Date.now },
  return_date: { type: Date, default: null },
});

export default mongoose.model("Borrow", borrowSchema);
