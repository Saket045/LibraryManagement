const express = require("express");
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const Membership = require("../models/Membership");
const User= require ("../models/User")
const { authenticateUser , authenticateAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/issue", authenticateUser, async (req, res) => {
  try {
    const { bookName, author, issueDate, returnDate } = req.body;
    const userId = req.user.id; // Get authenticated user ID

    // Find the book by name and author
    const book = await Book.findOne({ bookName, author });

    if (!book || book.copies < 1) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Create transaction
    const transaction = new Transaction({
      userId,
      bookId: book._id,
      issueDate: issueDate || new Date(),
      returnDate: returnDate || new Date(new Date().setDate(new Date().getDate() + 15)), // Default return in 15 days
      status: "issued",
    });

    await transaction.save();

    book.copies -= 1;
    await book.save();

    res.status(201).json({ message: "Book issued successfully!", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error issuing book", error });
  }
});

// Return a book
router.post("/return", authenticateUser, async (req, res) => {
  try {
    const { isbn, bookName, author, returnDate } = req.body;
    const userId = req.user.id; // Assuming user authentication middleware adds `req.user.id`

    // Find the book by ISBN (required)
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Ensure the book matches the provided title and author if they exist
    if (bookName && book.bookName !== bookName) {
      return res.status(400).json({ message: "Book title does not match ISBN" });
    }
    if (author && book.author !== author) {
      return res.status(400).json({ message: "Author does not match ISBN" });
    }

    // Find the transaction where the book is issued and not yet returned
    const transaction = await Transaction.findOne({
      userId,
      bookId: book._id,
      status: "issued",
    });

    if (!transaction) {
      return res.status(400).json({ message: "No active issued book found" });
    }

    // Update transaction to mark as returned
    transaction.status = "returned";
    transaction.actualReturnDate =  new Date();
    if (transaction.actualReturnDate > returnDate) {
      const delayInMilliseconds = transaction.actualReturnDate.getTime() - returnDate.getTime();
      const delayInDays = Math.ceil(delayInMilliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      transaction.delay = delayInDays;
    }
    
    await transaction.save();

    // Increase available copies
    book.copies += 1;
    await book.save();

    res.status(200).json({ message: "Book returned successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
});

// Get all issued books
router.get("/issues", async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "issued" })
      .populate("userId", "username email") // Populate user details
      .populate("bookId", "bookName author isbn"); // Populate book details

    res.status(200).json({ message: "Issued books retrieved successfully", transactions });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving issued books", error });
  }
});

module.exports = router;
