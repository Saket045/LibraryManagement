const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true },
  category: { type: String },
  copies: { type: Number},
  totalCopies: { type: Number},
  addedAt: { type: Date, default: Date.now },
  status:{type:"String",default:"available"}
});

module.exports = mongoose.model("Book", BookSchema);
