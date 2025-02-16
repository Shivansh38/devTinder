const jwt = require('jsonwebtoken');
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // Read token from cookies
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token not found");
        }

        // Verify token
        const decodedObj = await jwt.verify(token, "Devtinder@123");
        const { _id } = decodedObj;

        // Find user
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next(); 
    } catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err.message });
    }
};

module.exports = userAuth;
