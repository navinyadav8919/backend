const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected route (requires token)
router.post("/", authMiddleware, blogController.createBlog);

// Public route
router.get("/", blogController.getBlogs);
// comment these if not implemented 
router.get("/:id", blogController.getBlogsById); 
router.put("/:id",authMiddleware, blogController.updateBlogs); 
router.delete("/:id",authMiddleware, blogController.deleteBlogs);

module.exports = router;