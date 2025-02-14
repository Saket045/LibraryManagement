const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateTokenAndSetCookie=require("../utils/generateToken")

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({
      user: { name: user.name, email: user.email, role: user.role }
    });
}
catch(error){
    return res.status(500).json({message:error.message})
   }
});

module.exports = router;
