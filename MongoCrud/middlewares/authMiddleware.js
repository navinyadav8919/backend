const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // ✅ FIXED

        console.log("DECODED:", decoded);

        req.user = decoded;

        next();

    } catch (err) {
        console.log("JWT ERROR:", err.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;