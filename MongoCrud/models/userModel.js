const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true
    }
});

// ✅ THIS LINE IS VERY IMPORTANT
module.exports = mongoose.model("User", userSchema);