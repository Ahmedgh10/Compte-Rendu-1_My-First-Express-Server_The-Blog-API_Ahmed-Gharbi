const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Le préfixe /api/articles est défini dans server.js
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
