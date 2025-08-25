import express from "express";
import { addBook, getBooks, getBook, updateBook, deleteBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", addBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
