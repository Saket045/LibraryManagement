const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true },
  category: { type: String },
  availableCopies: { type: Number, required: true, default: 1 },
  totalCopies: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", BookSchema);
