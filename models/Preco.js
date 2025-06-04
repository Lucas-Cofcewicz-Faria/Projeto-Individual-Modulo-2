
const pool = require('../config/database');

async function createPreco({ sala_id, dia_semana, hora_inicio, hora_fim, preco_total }) {
  const query =
    'INSERT INTO precos (sala_id, dia_semana, hora_inicio, hora_fim, preco_total) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [sala_id, dia_semana, hora_inicio, hora_fim, preco_total];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllPrecos() {
  const query = 'SELECT * FROM precos';
  const result = await pool.query(query);
  return result.rows;
}

async function updatePreco(idpreco,  {sala_id, dia_semana, hora_inicio, hora_fim, preco_total}) {
  const query = `
    UPDATE precos SET sala_id = $1, dia_semana = $2, hora_inicio = $3, hora_fim = $4, preco_total = $5
    WHERE idpreco = $6 RETURNING *`;
  const values = [sala_id, dia_semana, hora_inicio, hora_fim, preco_total, idpreco];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

async function deletePreco(idpreco) {
  const query = 'DELETE FROM precos WHERE idpreco = $1 RETURNING *';
  const values = [idpreco];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

module.exports = {
  createPreco,
  getAllPrecos,
  updatePreco,
  deletePreco
};
