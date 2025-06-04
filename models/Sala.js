// models/Sala.js
const pool = require('../config/database');

async function createSala({ nomesala, tamanho, idlocalizacao }) {
  const query =
    'INSERT INTO salas (nomesala, tamanho, idlocalizacao) VALUES ($1, $2, $3) RETURNING *';
  const values = [nomesala, tamanho, idlocalizacao];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllSalas() {
  const query = 'SELECT * FROM salas';
  const result = await pool.query(query);
  return result.rows;
}

async function updateSala(idsala, { nomesala, tamanho, idlocalizacao }) {
  const query = `
    UPDATE salas SET nomesala = $1, tamanho = $2, idlocalizacao = $3
    WHERE idsala = $4 RETURNING *`;
  const values = [nomesala, tamanho, idlocalizacao, idsala];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

async function deleteSala(idsala) {
  const query = 'DELETE FROM salas WHERE idsala = $1 RETURNING *';
  const values = [idsala];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

module.exports = {
  createSala,
  getAllSalas,
  updateSala,
  deleteSala
};
