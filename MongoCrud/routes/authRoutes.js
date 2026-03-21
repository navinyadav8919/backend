const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ REGISTER
router.post("/register", async (req, res) => {
    const { username, role, password } = req.body;

    try {
        // validation (optional but good)
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            role,
            password: hashed
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: "User registration failed",
            error: err.message
        });
    }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Login failed",
            error: err.message
        });
    }
});

module.exports = router;