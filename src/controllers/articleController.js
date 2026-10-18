const Article = require('../models/articleModel');
const User = require('../models/userModel');
const handleError = require('../utils/handleError');

// GET /api/articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email');
    res.status(200).json(articles);
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/articles
const createArticle = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ message: 'title, content, and authorId are required' });
    }

    // The author must exist in the users collection
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found (invalid authorId)' });
    }

    const newArticle = await Article.create({ title, content, author: authorId });
    const populatedArticle = await newArticle.populate('author', 'name email');
    res.status(201).json(populatedArticle);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/articles/:id
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name email');
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    handleError(err, res);
  }
};

// PUT /api/articles/:id
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found for update' });
    }
    const populated = await article.populate('author', 'name email');
    res.status(200).json(populated);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/articles/:id
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found for deletion' });
    }
    res.status(200).json({ message: 'Article deleted successfully', id: req.params.id });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle
};
