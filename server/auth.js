const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('./db');

const SALT_ROUNDS = 10;

function hashPassword(password) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions (token, user_id) VALUES (?, ?)').run(token, userId);
  return token;
}

function deleteSession(token) {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

function getUserByToken(token) {
  return db
    .prepare(
      `SELECT users.id, users.username
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token = ?`
    )
    .get(token);
}

function requireAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const user = token && getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Not signed in' });
  }
  req.user = user;
  req.token = token;
  next();
}

module.exports = { hashPassword, verifyPassword, createSession, deleteSession, requireAuth };
