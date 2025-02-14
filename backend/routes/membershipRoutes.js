const express = require("express");
const Membership = require("../models/MemberShip");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();

// Add membership
router.post("/", authenticateUser, async (req, res) => {
  try {
    const userId=req.user._id;
    const { durationMonths } = req.body;
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + durationMonths);

    const membership = new Membership({ userId, expiryDate, status: "active" });
    await membership.save();
    
    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: "Error creating membership", error });
  }
});

// Update membership (Extend or cancel)
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const { durationMonths } = req.body;
    const membership = await Membership.findById(req.params.id);

    if (!membership) return res.status(404).json({ message: "Membership not found" });

    if (durationMonths) {
      membership.expiryDate.setMonth(membership.expiryDate.getMonth() + durationMonths);
    } else {
      membership.status = "expired";
    }

    await membership.save();
    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: "Error updating membership", error });
  }
});

module.exports = router;
