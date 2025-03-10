const express = require("express");
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const Membership = require("../models/Membership");
const User= require ("../models/User")
const { authenticateUser , authenticateAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateAdmin, async (req, res) => {
  try {
    const { isbn, bookName, author, category, copies } = req.body;

    if (!isbn || !bookName || !category || !copies) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newBook = new Book({
      isbn,
      bookName,
      author,
      category,
      copies,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

router.get("/:bookName", async (req, res) => {
  try {
    const book = await Book.findOne({ bookName: req.params.bookName });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.put("/:bookName", async (req, res) => {
  const { copies, status } = req.body;
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { bookName: req.params.bookName },
      { copies, status },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.delete("/:id", authenticateAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

router.get("/search/:bookName", async (req, res) => {
  try {
    const { bookName } = req.params;

    if (!bookName) {
      return res.status(400).json({ message: "Book name parameter is required" });
    }

    const books = await Book.find({
      bookName: { $regex: bookName, $options: "i" }
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});


module.exports = router;
