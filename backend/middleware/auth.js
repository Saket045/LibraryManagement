const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Authenticate any logged-in user
const authenticateUser = async (req, res, next) => {
  try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
		}
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found..." });
		}

		req.user = user;
		next();
	} catch (err) {
		console.log("Error in protectRoute middleware", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};


// Authenticate Admin (For Book Management)
const authenticateAdmin = async (req, res, next) => {
  await authenticateUser(req, res, async () => {
    console.log(req.user.role);
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    next();
  });
};

module.exports = { authenticateUser, authenticateAdmin };
