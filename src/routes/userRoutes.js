const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, deleteUser } = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser); // Exercise 1

module.exports = router;
