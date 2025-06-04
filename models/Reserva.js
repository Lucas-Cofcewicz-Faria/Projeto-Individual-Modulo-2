// models/Sala.js
const pool = require('../config/database');

async function createReserva({ user_id, sala_id, status, data, horario, preco_id }) {
  const query =
    'INSERT INTO reservas (user_id, sala_id, status, data, horario, preco_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [user_id, sala_id, status, data, horario, preco_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllReservas() {
  const query = 'SELECT * FROM reservas';
  const result = await pool.query(query);
  return result.rows;
}

async function updateReserva(idreserva,  {user_id, sala_id, status, data, horario, preco_id }) {
  const query = `
    UPDATE reservas SET user_id = $1, sala_id = $2, status = $3, data = $4, horario = $5, preco_id = $6
    WHERE idreserva = $7 RETURNING *`;
  const values = [user_id, sala_id, status, data, horario, preco_id, idreserva];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

async function deleteReserva(idreserva) {
  const query = 'DELETE FROM reservas WHERE idreserva = $1 RETURNING *';
  const values = [idreserva];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

module.exports = {
  createReserva,
  getAllReservas,
  updateReserva,
  deleteReserva
};
