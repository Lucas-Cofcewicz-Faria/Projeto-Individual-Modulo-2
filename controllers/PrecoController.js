// controllers/TarefaController.js
const pool = require('../config/database');

// Criar um novo preco
exports.criarPreco = async (req, res) => {
  const { sala_id, dia_semana, hora_inicio, hora_fim, preco_total } = req.body;

  const query = 'INSERT INTO precos (sala_id, dia_semana, hora_inicio, hora_fim, preco_total) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [sala_id, dia_semana, hora_inicio, hora_fim, preco_total];

  try {
    const result = await pool.query(query, values);
    const preco = result.rows[0];
    res.status(201).json(preco);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os precos
exports.listarPrecos = async (req, res) => {
  const query = 'SELECT * FROM Precos';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um preco
exports.editarPreco = async (req, res) => {
  const { idpreco } = req.params;
  const { sala_id, dia_semana, hora_inicio, hora_fim, preco_total } = req.body;

  const query = `
    UPDATE precos SET sala_id = $1, dia_semana = $2, hora_inicio = $3, hora_fim = $4, preco_total = $5
    WHERE idpreco = $6 RETURNING *`;
  const values = [sala_id, dia_semana, hora_inicio, hora_fim, preco_total, idpreco];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Preco não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um preco
exports.excluirPreco = async (req, res) => {
  const { idpreco } = req.params;
  const query = 'DELETE FROM precos WHERE idpreco = $1 RETURNING *';
  const values = [idpreco];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Preco não encontrado' });
    }
    res.status(200).json({ message: 'preco excluído com sucesso' })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};