const Blogs = require("../models/Blogs");

exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = new Blogs({
            title,
            content,
            author: req.user.id  // safe access
        });

        console.log(blog, "blog data 1111111");

        await blog.save();

        res.status(201).json(blog);

    } catch (err) {
        res.status(400).json({ 
    message: "Blog not created", 
    error: err.message 
});
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


exports.getBlogsById = async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "No Blog found with this Id"
            });
        }

        res.status(200).json(blog);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching blog",
            error: err.message
        });
    }
};

exports.updateBlogs = async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "No Blog found with this Id"
            });
        }

        console.log("DB Author:", blog.author.toString());
        console.log("Logged User:", req.user.id);

        // 🔐 Owner check
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized - you cannot update this blog"
            });
        }

        // ✅ Update fields
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;

        await blog.save();

        res.status(200).json(blog); // ✅ FIXED

    } catch (err) {
        res.status(500).json({
            message: "Error updating blog",
            error: err.message
        });
    }
};

exports.deleteBlogs = async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "No Blog found with this Id"
            });
        }

        console.log("DB Author:", blog.author.toString());
        console.log("Logged User:", req.user.id);

        // 🔐 OWNER + ADMIN CHECK
        if (
            blog.author.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Unauthorized - you cannot delete this blog"
            });
        }

        await blog.deleteOne();

        res.status(200).json({
            message: "Blog deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting blog",
            error: err.message
        });
    }
};