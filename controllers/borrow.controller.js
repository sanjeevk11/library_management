import Book from "../models/book.model.js";
import Borrow from "../models/borrow.model.js";

// Borrow a book
export const borrowBook = async (req, res) => {
  try {
    const { book_id, member_id } = req.body;

    const book = await Book.findById(book_id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    // Check available copies
    if (book.available_copies <= 0) {
      return res.status(400).json({ error: "No copies available" });
    }

    // Create borrow record
    const borrow = await Borrow.create({
      book_id,
      member_id,
      borrow_date: new Date(),
    });

    // Decrease available copies
    book.available_copies -= 1;
    await book.save();

    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) return res.status(404).json({ error: "Borrow record not found" });

    // Already returned?
    if (borrow.return_date) {
      return res.status(400).json({ error: "Book already returned" });
    }

    // Set return date
    borrow.return_date = new Date();
    await borrow.save();

    // Increase available copies
    const book = await Book.findById(borrow.book_id);
    if (book) {
      book.available_copies += 1;
      await book.save();
    }

    res.status(200).json(borrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
