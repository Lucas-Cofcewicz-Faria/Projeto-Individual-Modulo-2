
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
    UPDATE salas
       SET nomesala = $1,
           tamanho = $2,
           idlocalizacao = $3
     WHERE idsala = $4
     RETURNING *`;
  const values = [nomesala, tamanho, idlocalizacao, idsala];
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

async function deleteSala(idsala) {
  const query = 'DELETE FROM salas WHERE idsala = $1 RETURNING *';
  const values = [idsala];
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

async function buscarComFiltros({ sala, tamanho }) {
  const sql = `
    SELECT
      s.idsala,
      s.nomesala,
      l.endereco,
      l.andar,
      s.tamanho,
      -- pega o id do registro com menor preco_hora
      (
        SELECT p.idpreco
        FROM precos AS p
        WHERE p.sala_id = s.idsala
        ORDER BY p.preco_hora
        LIMIT 1
      ) AS preco_id,
      -- pega o valor do menor preco_hora
      (
        SELECT p.preco_hora
        FROM precos AS p
        WHERE p.sala_id = s.idsala
        ORDER BY p.preco_hora
        LIMIT 1
      ) AS preco
    FROM salas AS s
      JOIN localizacoes AS l
        ON l.idlocalizacao = s.idlocalizacao
    WHERE
      ($1::text IS NULL OR s.nomesala ILIKE '%' || $1 || '%')
      AND ($2::text IS NULL OR LOWER(s.tamanho) = LOWER($2))
    ORDER BY s.nomesala;
  `;

  const nomeParam    = sala    && sala.trim()   !== '' ? sala.trim()   : null;
  const tamanhoParam = tamanho && tamanho.trim() !== '' ? tamanho.trim() : null;
  const result = await pool.query(sql, [nomeParam, tamanhoParam]);

  
  const rows = result.rows.map(r => ({
    ...r,
    preco_id: r.preco_id,                            
    preco:    r.preco    != null ? parseFloat(r.preco) : null
  }));

  return rows;
}

module.exports = {
  createSala,
  getAllSalas,
  updateSala,
  deleteSala,
  buscarComFiltros
};
