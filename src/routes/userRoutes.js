const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getUserById,
  updatePassword,
  updateUserRole,
  deleteUser
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Public authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes (valid JWT). Fixed paths go before '/:id'.
router.get('/profile', protect, getUserProfile);
router.put('/update-password', protect, updatePassword); // Exercise 1

// Administrator-only routes (valid JWT + admin role)
router.get('/', protect, adminOnly, getAllUsers);
router.put('/:id/role', protect, adminOnly, updateUserRole); // Exercise 2
router.get('/:id', protect, getUserById);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
