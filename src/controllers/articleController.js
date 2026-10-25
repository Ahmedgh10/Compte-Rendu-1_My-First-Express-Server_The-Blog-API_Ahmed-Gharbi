const Article = require('../models/articleModel');
const handleError = require('../utils/handleError');

const POPULATE_FIELDS = 'name email role';

// GET /api/articles (public)
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', POPULATE_FIELDS);
    res.status(200).json(articles);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/articles/my-articles (Exercise 2, protected)
const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id }).populate('author', POPULATE_FIELDS);
    res.status(200).json(articles);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/articles/:id (public)
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', POPULATE_FIELDS);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/articles (protected) - the author comes from the token, never from the body
const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newArticle = await Article.create({
      title,
      content,
      author: req.user._id
    });
    const populated = await newArticle.populate('author', POPULATE_FIELDS);
    res.status(201).json(populated);
  } catch (err) {
    handleError(err, res);
  }
};

// PUT /api/articles/:id (protected: author or admin)
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: you are not the author of this article' });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    const updated = await article.save();
    const populated = await updated.populate('author', POPULATE_FIELDS);
    res.status(200).json(populated);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/articles/:id (protected: author or admin)
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: you are not the author of this article' });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Article deleted successfully', id: req.params.id });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getAllArticles,
  getMyArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
