const { users } = require("../data/product");

// GET all users
const getAllUsers = (req, res) => {
    res.json(users);
};

// GET user by ID
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
};

// CREATE user
const createUser = (req, res) => {
    const { id, name, email } = req.body;

    const existing = users.find(u => u.id === id);

    if (existing) {
        return res.status(400).json({ message: "User with this id already exists" });
    }

    const newUser = { id, name, email };
    users.push(newUser);

    res.status(201).json({
        message: "New user created",
        data: newUser
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser
};