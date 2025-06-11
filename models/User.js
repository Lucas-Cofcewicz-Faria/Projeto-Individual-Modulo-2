
const pool = require('../config/database');

/**
 * 
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
async function findByEmail(email) {
  const result = await pool.query(
    'SELECT iduser, nome, email, senha FROM users WHERE email = $1',
    [email.trim().toLowerCase()]
  );
  return result.rows[0] || null;
}

/**
 * 
 * @param {{ nome: string, email: string, senha: string }} data
 * @returns {Promise<{ iduser: number, nome: string, email: string }>}
 */
async function createUser({ nome, email, senha }) {
  const result = await pool.query(
    `INSERT INTO users (nome, email, senha)
     VALUES ($1, $2, $3)
     RETURNING iduser, nome, email`,
    [nome.trim(), email.trim().toLowerCase(), senha]
  );
  return result.rows[0];
}

/**
 * 
 * @returns {Promise<Array>}
 */
async function getAllUsers() {
  const result = await pool.query(
    'SELECT iduser, nome, email FROM users'
  );
  return result.rows;
}

/**
 * 
 * @param {number} iduser
 * @param {{ nome: string, email: string, senha?: string }} data
 * @returns {Promise<Object|null>}
 */
async function updateUser(iduser, { nome, email, senha }) {
  const values = [nome.trim(), email.trim().toLowerCase(), senha, iduser];
  const result = await pool.query(
    `UPDATE users
     SET nome = $1, email = $2, senha = $3
     WHERE iduser = $4
     RETURNING iduser, nome, email`,
    values
  );
  return result.rows[0] || null;
}

/**
 * 
 * @param {number} iduser
 * @returns {Promise<Object|null>}
 */
async function deleteUser(iduser) {
  const result = await pool.query(
    'DELETE FROM users WHERE iduser = $1 RETURNING iduser, nome, email',
    [iduser]
  );
  return result.rows[0] || null;
}

module.exports = {
  findByEmail,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
};
