const { estNonVide, estEmailValide } = require('../utils/validators');

let users = [
  { id: 1, name: 'Aya', email: 'aya@example.com', role: 'admin' },
  { id: 2, name: 'Omar', email: 'omar@example.com', role: 'user' }
];
let prochainId = 3;

// GET /api/users  (filtre optionnel ?role=...)
const getAllUsers = (req, res) => {
  const { role } = req.query;

  let resultat = users;
  if (role) {
    resultat = users.filter(u => u.role === role);
  }
  res.status(200).json({ total: resultat.length, users: resultat });
};

// GET /api/users/:id
const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  res.status(200).json(user);
};

// POST /api/users
const createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!estNonVide(name)) {
    return res.status(400).json({ error: 'Le nom est obligatoire et ne peut pas être vide' });
  }
  if (!estEmailValide(email)) {
    return res.status(400).json({ error: "L'email est invalide (il doit contenir @ et un point)" });
  }

  const nouvelUtilisateur = { id: prochainId++, name, email, role: role || 'user' };
  users.push(nouvelUtilisateur);

  res.status(201).json({ message: 'Utilisateur créé', user: nouvelUtilisateur });
};

// DELETE /api/users/:id
const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const userExiste = users.some(u => u.id === id);

  if (!userExiste) {
    return res.status(404).json({ error: `Impossible de supprimer : utilisateur ${id} introuvable` });
  }

  users = users.filter(u => u.id !== id);
  res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès` });
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser };
