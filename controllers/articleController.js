// Données en mémoire pour cette séance
let articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];
let prochainId = 4;

// GET /api/articles  (filtre optionnel ?author=...)
const getAllArticles = (req, res) => {
  const { author } = req.query;

  let resultat = articles;
  if (author) {
    resultat = articles.filter(a => a.author === author);
  }
  res.status(200).json({ total: resultat.length, articles: resultat });
};

// GET /api/articles/:id
const getArticleById = (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }
  res.status(200).json(article);
};

// POST /api/articles
const createArticle = (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Le titre et l'auteur sont obligatoires" });
  }

  const nouvelArticle = { id: prochainId++, title, author };
  articles.push(nouvelArticle);

  res.status(201).json({ message: 'Article créé', article: nouvelArticle });
};

// PUT /api/articles/:id
const updateArticle = (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;

  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  if (title) articles[index].title = title;
  if (author) articles[index].author = author;

  res.status(200).json({ message: 'Article mis à jour', article: articles[index] });
};

// DELETE /api/articles/:id
const deleteArticle = (req, res) => {
  const id = Number(req.params.id);
  const articleExiste = articles.some(a => a.id === id);

  if (!articleExiste) {
    return res.status(404).json({ error: `Impossible de supprimer : article ${id} introuvable` });
  }

  articles = articles.filter(a => a.id !== id);
  res.status(200).json({ message: `Article ${id} supprimé avec succès` });
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
