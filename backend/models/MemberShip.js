const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true }, // Membership validity
  status: { type: String, enum: ["active", "expired"], default: "active" }
});

module.exports = mongoose.model("Membership", MembershipSchema);
