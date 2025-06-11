
const pool = require('../config/database');


async function listarPrecos() {
  const { rows } = await pool.query(
    'SELECT idpreco, preco_hora, sala_id FROM precos'
  );
  return rows;
}


async function getPrecoBySalaId(idsala) {
  const { rows } = await pool.query(
    'SELECT preco_hora FROM precos WHERE sala_id = $1',
    [idsala]
  );
  return rows[0]?.preco_hora || null;
}


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

async function criarPreco({ preco_hora, sala_id }) {
  const { rows } = await pool.query(
    'INSERT INTO precos (preco_hora, sala_id) VALUES ($1, $2) RETURNING idpreco, preco_hora, sala_id',
    [preco_hora, sala_id]
  );
  return rows[0];
}

async function editarPreco(idpreco, { preco_hora }) {
  const { rows } = await pool.query(
    'UPDATE precos SET preco_hora = $1 WHERE idpreco = $2 RETURNING idpreco, preco_hora, sala_id',
    [preco_hora, idpreco]
  );
  return rows[0] || null;
}

async function excluirPreco(idpreco) {
  await pool.query(
    'DELETE FROM precos WHERE idpreco = $1',
    [idpreco]
  );
}

/**
 * 
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
