const mongoose = require("mongoose");

const FineSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    dueDate: { type: Date, required: true }, // Date when the book was due
    returnDate: { type: Date, required: true }, // Date when the book was actually returned
    fineAmount: { type: Number, required: true, default: 0 }, // Fine amount calculated
    status: { 
        type: String, 
        enum: ["Pending", "Paid"], 
        default: "Pending" 
    }, // Fine payment status
    paidAt: { type: Date } // Timestamp when fine was paid
}, { timestamps: true }); // Adds createdAt & updatedAt

module.exports = mongoose.model("Fine", FineSchema);
