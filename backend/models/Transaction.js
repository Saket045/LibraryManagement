const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date }, 
  actualReturnDate: { type: Date }, 
  delay:{type:Number},
  status: { type: String, enum: ["issued", "returned"], default: "issued" }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
