const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevents XSS attacks
        sameSite: "strict", // Prevents CSRF attacks
    });
};

module.exports = generateTokenAndSetCookie;
