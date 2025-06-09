// models/Preco.js
const pool = require('../config/database');

// Retorna todos os preços por hora e sala
async function listarPrecos() {
  const { rows } = await pool.query(
    'SELECT idpreco, preco_hora, sala_id FROM precos'
  );
  return rows;
}

// Busca o preço por hora de uma sala específica
async function getPrecoBySalaId(idsala) {
  const { rows } = await pool.query(
    'SELECT preco_hora FROM precos WHERE sala_id = $1',
    [idsala]
  );
  return rows[0]?.preco_hora || null;
}

// Calcula o preço total dado início e fim (formato "HH:MM")
async function calcularPrecoTotal(horaInicio, horaFim, idsala) {
  const [hiH, hiM] = horaInicio.split(':').map(Number);
  const [hfH, hfM] = horaFim.split(':').map(Number);
  const minutosInicio = hiH * 60 + hiM;
  const minutosFim    = hfH * 60 + hfM;
  const horas = (minutosFim - minutosInicio) / 60;

  const precoHora = await getPrecoBySalaId(idsala);
  if (precoHora == null) return null;
  return parseFloat((horas * precoHora).toFixed(2));
}

// Cria um novo preço por hora para uma sala
async function criarPreco({ preco_hora, sala_id }) {
  const { rows } = await pool.query(
    'INSERT INTO precos (preco_hora, sala_id) VALUES ($1, $2) RETURNING idpreco, preco_hora, sala_id',
    [preco_hora, sala_id]
  );
  return rows[0];
}

// Atualiza o preço por hora de um registro existente
async function editarPreco(idpreco, { preco_hora }) {
  const { rows } = await pool.query(
    'UPDATE precos SET preco_hora = $1 WHERE idpreco = $2 RETURNING idpreco, preco_hora, sala_id',
    [preco_hora, idpreco]
  );
  return rows[0] || null;
}

// Exclui um preço pelo ID
async function excluirPreco(idpreco) {
  await pool.query(
    'DELETE FROM precos WHERE idpreco = $1',
    [idpreco]
  );
}

/**
 * Busca o valor-hora dado um idpreco.
 * @param {number} idpreco
 * @returns {Promise<number|null>}
 */
async function getPrecoById(idpreco) {
  const { rows } = await pool.query(
    'SELECT preco_hora FROM precos WHERE idpreco = $1',
    [idpreco]
  );
  return rows[0]?.preco_hora ?? null;
}

module.exports = {
  listarPrecos,
  getPrecoBySalaId,
  calcularPrecoTotal,
  getPrecoById,  
  criarPreco,
  editarPreco,
  excluirPreco
};
