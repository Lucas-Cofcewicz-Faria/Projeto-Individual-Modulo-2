// models/Sala.js
const pool = require('../config/database');

async function createLocalizacao({ nomelocal, endereco, andar }) {
  const query =
    'INSERT INTO localizacoes (nomelocal, endereco, andar) VALUES ($1, $2, $3) RETURNING *';
  const values = [nomelocal, endereco, andar];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllLocalizacoes() {
  const query = 'SELECT * FROM localizacoes';
  const result = await pool.query(query);
  return result.rows;
}

async function updateLocalizacao(idlocalizacao, { nomelocal, endereco, andar }) {
  const query = `
    UPDATE localizacoes SET nomelocal = $1, endereco = $2, andar = $3
    WHERE idlocalizacao = $4 RETURNING *`;
  const values = [nomelocal, endereco, andar, idlocalizacao];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

async function deleteLocalizacao(idlocalizacao) {
  const query = 'DELETE FROM localizacoes WHERE idlocalizacao = $1 RETURNING *';
  const values = [idlocalizacao];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

module.exports = {
  createLocalizacao,
  getAllLocalizacoes,
  updateLocalizacao,
  deleteLocalizacao
};
