const express = require("express");
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();

// Issue a book
router.post("/issue", authenticateUser, async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.availableCopies < 1) return res.status(400).json({ message: "Book not available" });

    const issueDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(issueDate.getDate() + 15); // Due in 15 days

    const transaction = new Transaction({ userId, bookId, issueDate, returnDate, status: "issued" });
    await transaction.save();

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error issuing book", error });
  }
});

// Return a book
router.post("/return/:id", authenticateUser, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.status === "returned") return res.status(400).json({ message: "Invalid transaction" });
    
    transaction.actualReturnDate = new Date();
    transaction.status = "returned";
    transaction

    const book = await Book.findById(transaction.bookId);
    book.availableCopies += 1;
    await book.save();

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
});

module.exports = router;
