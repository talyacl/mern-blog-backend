const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
}   catch (err) {
    res.status(500).json({ message: err.message });
}
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ user: { id: 'user._id'} }, process.env.TOKEN_SECRET);
    res.json({ token, userId: user._id});
}   catch (err) {
    res.status(500).json({ message: err.message });
}
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
}   catch (err) {
    res.status(500).json({ message: err.message });
}
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
}   catch (err) {
    res.status(500).json({ message: err.message });
}
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
}   catch (err) {
    res.status(400).json({ message: err.message });
}
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
} catch (err) {
    res.status(400).json({ message: err.message });
}
};

module.exports = { register, login, getAllUsers, getUser, updateUser, deleteUser };