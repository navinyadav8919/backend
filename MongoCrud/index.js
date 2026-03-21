const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());

app.get("/home", (req, res) => {
    res.send("home page is yet to complete");
});

app.use("/auth", authRoute);
app.use("/blogs", blogRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running at 3001");
    });
});