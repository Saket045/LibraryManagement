const express = require("express");
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const Membership = require("../models/Membership");
const User= require ("../models/User")
const { authenticateUser , authenticateAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, contactNumber, startDate, membership } = req.body;

    if (!name || !contactNumber || !startDate || !membership) {
      return res.status(400).json({ message: "All fields are required" });
    }
  const member = await User.findOne({name:name});
  if(!member) return res.status(404).json({msg:"Mmeber doesnt exist"});
    
    const start = new Date(startDate);
    const expiryDate = new Date(start.getFullYear(), start.getMonth() + parseInt(membership), start.getDate());

    const newMembership = new Membership({
      userId,
      name,
      contactNumber,
      startDate: start,
      expiryDate,
      status: "active",
    });

    await newMembership.save();
    res.status(201).json(newMembership);
  } catch (error) {
    res.status(500).json({ message: "Error creating membership", error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const membership = await Membership.findOne({ userId: req.params.userId });

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    res.json(membership);
  } catch (error) {
    console.error("Error fetching membership:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:userId", async (req, res) => {
  const { duration } = req.body; 
  try {
    const membership = await Membership.findOne({ userId: req.params.userId });

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    const newExpiryDate = new Date(membership.expiryDate);
    newExpiryDate.setMonth(newExpiryDate.getMonth() + parseInt(duration));

    membership.expiryDate = newExpiryDate;

    await membership.save();
    res.json({ message: "Membership updated successfully", membership });
  } catch (error) {
    console.error("Error updating membership:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authenticateUser, async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching memberships", error });
  }
});


module.exports = router;
