const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected route (requires token)
router.post("/", authMiddleware, blogController.createBlog);

// Public route
router.get("/", blogController.getBlogs);

module.exports = router;