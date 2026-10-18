const User = require('../models/userModel');
const Article = require('../models/articleModel');
const handleError = require('../utils/handleError');

// POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, age, role, bio, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Duplicate email check -> 409
    const exists = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (exists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const user = await User.create({ name, email, age, role, bio, phone });
    res.status(201).json(user);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/users/:id  (Exercise 1 - referential integrity guard)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const dependent = await Article.findOne({ author: req.params.id });
    if (dependent) {
      return res
        .status(400)
        .json({ message: 'Impossible to delete an author with published articles' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully', id: req.params.id });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { createUser, getUsers, getUserById, deleteUser };
