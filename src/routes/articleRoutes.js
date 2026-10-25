const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getMyArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware');

// Public read routes
router.get('/', getAllArticles);

// Exercise 2: must be declared BEFORE '/:id', otherwise "my-articles" is read as an id
router.get('/my-articles', protect, getMyArticles);

router.get('/:id', getArticleById);

// Protected write operations
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;
