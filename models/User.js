// models/Sala.js
const pool = require('../config/database');

async function createUsers({ nome, senha, email }) {
  const query =
    'INSERT INTO users (nome, senha, email) VALUES ($1, $2, $3) RETURNING *';
  const values = [nome, senha, email];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllUsers() {
  const query = 'SELECT * FROM users';
  const result = await pool.query(query);
  return result.rows;
}

async function updateUser(iduser, { nome, senha, email }) {
  const query = `
    UPDATE users SET nome = $1, senha = $2, email = $3
    WHERE iduser = $4 RETURNING *`;
  const values = [nome, senha, email, iduser];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

async function deleteUser(iduser) {
  const query = 'DELETE FROM users WHERE iduser = $1 RETURNING *';
  const values = [iduser];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

module.exports = {
  createUsers,
  getAllUsers,
  updateUser,
  deleteUser
};
