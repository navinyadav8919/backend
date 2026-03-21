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