
const pool = require('../config/database');

/**
 * 
 * @param {{
 *   user_id: number,
 *   sala_id: number,
 *   data_reserva: string,     // ex: '2025-06-10'
 *   hora_inicio: string,      // ex: '14:00'
 *   hora_fim: string,         // ex: '16:30'
 *   preco_id: number,
 *   preco_total: number
 * }} data
 * @returns {Promise<Object>}   
 */
async function createReserva(data) {
  const {
    user_id,
    sala_id,
    data_reserva,
    hora_inicio,
    hora_fim,
    preco_id,
    preco_total
  } = data;

  const res = await pool.query(
    `INSERT INTO reservas 
       (user_id, sala_id, data_reserva, hora_inicio, hora_fim, preco_id, preco_total)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [user_id, sala_id, data_reserva, hora_inicio, hora_fim, preco_id, preco_total]
  );
  return res.rows[0];
}

async function getAllReservas() {
  const res = await pool.query(`SELECT * FROM reservas`);
  return res.rows;
}

/**
 * 
 * @param {number} idreserva
 * @param {{
 *   user_id?: number,
 *   sala_id?: number,
 *   data_reserva?: string,
 *   hora_inicio?: string,
 *   hora_fim?: string,
 *   preco_id?: number,
 *   preco_total?: number
 * }} data
 * @returns {Promise<Object|null>}
 */
async function updateReserva(idreserva, data) {
  const fields = [];
  const values = [];
  let idx = 1;
  for (const [key, val] of Object.entries(data)) {
    fields.push(`${key} = $${idx}`);
    values.push(val);
    idx++;
  }
  if (fields.length === 0) return null;

  const query = `
    UPDATE reservas
       SET ${fields.join(', ')}
     WHERE idreserva = $${idx}
     RETURNING *`;
  values.push(idreserva);

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}

async function deleteReserva(idreserva) {
  const res = await pool.query(
    `DELETE FROM reservas WHERE idreserva = $1 RETURNING *`,
    [idreserva]
  );
  return res.rows[0] || null;
}
async function getReservasByUserId(user_id) {
  const sql = `
    SELECT
      r.idreserva,
      r.data_reserva,
      r.hora_inicio,
      r.hora_fim,
      r.preco_total,
      s.idsala,
      s.nomesala,
      l.endereco
    FROM reservas   AS r
    JOIN salas      AS s ON s.idsala        = r.sala_id
    JOIN localizacoes AS l ON l.idlocalizacao = s.idlocalizacao
    WHERE r.user_id = $1
    ORDER BY r.data_reserva DESC, r.hora_inicio;
  `;
  const { rows } = await pool.query(sql, [user_id]);
  return rows;
}

module.exports = {
  createReserva,
  getAllReservas,
  updateReserva,
  getReservasByUserId,
  deleteReserva
};
