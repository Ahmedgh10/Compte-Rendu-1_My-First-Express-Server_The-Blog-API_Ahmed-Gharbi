const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// ---------- Data (in memory, resets on restart) ----------
const articles = [
  { id: 1, title: 'Welcome to the blog', author: 'Admin' },
  { id: 2, title: 'My first Express server', author: 'Aya' },
  { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];
let nextId = 4;

const users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' },
  { id: 2, name: 'Omar', email: 'omar@example.com' },
  { id: 3, name: 'Sara', email: 'sara@example.com' }
];

// ---------- Session 1 : Blog API ----------
app.get('/', (req, res) => {
  res.json({ message: 'Hello, I am the blog API' });
});

// GET /api/articles  and  GET /api/articles?author=Aya
app.get('/api/articles', (req, res) => {
  const { author } = req.query;

  let result = articles;
  if (author) {
    result = articles.filter(a => a.author === author);
  }
  res.json({ total: result.length, articles: result });
});

// GET /api/articles/:id
app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} not found` });
  }
  res.json(article);
});

// POST /api/articles
app.post('/api/articles', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newArticle = { id: nextId, title: title, author: author };
  nextId = nextId + 1;
  articles.push(newArticle);

  res.status(201).json({ message: 'Article created', article: newArticle });
});

// ---------- Exercise 1 ----------

// 1. GET /about
app.get('/about', (req, res) => {
  res.json({
    appName: 'Blog API',
    student: 'Bouhmid', // put your full name here
    version: '1.0.0'
  });
});

// 2 + 5 (bonus). GET /api/users  and  GET /api/users?name=Aya
app.get('/api/users', (req, res) => {
  const { name } = req.query;

  let result = users;
  if (name) {
    result = users.filter(u => u.name === name);
  }
  res.json(result);
});

// 3. GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: `User ${id} not found` });
  }
  res.json(user);
});

// 4. POST /contact
app.post('/contact', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }
  res.status(200).json({ message: 'Thank you, your message has been received' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
