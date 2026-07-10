const path = require('path');
const fs = require('fs');
const express = require('express');
const db = require('./db');
const {
  hashPassword,
  verifyPassword,
  createSession,
  deleteSession,
  requireAuth,
} = require('./auth');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

function scoreSummary(userId) {
  const { best } = db
    .prepare('SELECT MAX(score) AS best FROM scores WHERE user_id = ?')
    .get(userId);
  const history = db
    .prepare(
      `SELECT score, result, created_at AS createdAt
       FROM scores WHERE user_id = ?
       ORDER BY created_at DESC LIMIT 20`
    )
    .all(userId);
  return { best, history };
}

app.post('/api/auth/signup', (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const trimmedUsername = username.trim();
  if (trimmedUsername.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(trimmedUsername);
  if (existing) {
    return res.status(409).json({ error: 'That username is already taken' });
  }

  const passwordHash = hashPassword(password);
  const { lastInsertRowid: userId } = db
    .prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)')
    .run(trimmedUsername, passwordHash);

  const token = createSession(userId);
  res.status(201).json({ token, username: trimmedUsername });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = db
    .prepare('SELECT id, username, password_hash FROM users WHERE username = ?')
    .get(username.trim());

  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = createSession(user.id);
  res.json({ token, username: user.username });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  deleteSession(req.token);
  res.status(204).end();
});

app.get('/api/scores/me', requireAuth, (req, res) => {
  res.json(scoreSummary(req.user.id));
});

app.post('/api/scores', requireAuth, (req, res) => {
  const { score } = req.body || {};
  if (typeof score !== 'number' || !Number.isFinite(score)) {
    return res.status(400).json({ error: 'score must be a number' });
  }

  const result = score > 0 ? 'win' : score < 0 ? 'loss' : 'tie';
  db.prepare('INSERT INTO scores (user_id, score, result) VALUES (?, ?, ?)').run(
    req.user.id,
    score,
    result
  );
  res.status(201).json(scoreSummary(req.user.id));
});

// In production, serve the Vite build alongside the API from one process.
const buildDir = path.join(__dirname, '..', 'build');
if (fs.existsSync(buildDir)) {
  app.use(express.static(buildDir));
  app.get(/^\/(?!api\/).*/, (_req, res) => {
    res.sendFile(path.join(buildDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
