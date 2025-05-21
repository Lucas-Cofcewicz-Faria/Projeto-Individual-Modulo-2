// controllers/TarefaController.js
const pool = require('../config/database');

// Criar uma nova sala
exports.criarSala = async (req, res) => {
  const { nomesala, tamanho, idlocalizacao } = req.body;

  const query = 'INSERT INTO salas (nomesala, tamanho, idlocalizacao) VALUES ($1, $2, $3) RETURNING *';
  const values = [nomesala, tamanho, idlocalizacao];

  try {
    const result = await pool.query(query, values);
    const sala = result.rows[0];
    res.status(201).json(sala);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as salas
exports.listarSalas = async (req, res) => {
  const query = 'SELECT * FROM salas';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma sala
exports.editarSala = async (req, res) => {
  const { idsala } = req.params;
  const { nomesala, tamanho, idlocalizacao } = req.body;

  const query = `
    UPDATE salas SET nomesala = $1, tamanho = $2, idlocalizacao = $3
    WHERE idsala = $4 RETURNING *`;
  const values = [nomesala, tamanho, idlocalizacao, idsala];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma sala
exports.excluirSala = async (req, res) => {
  const { idsala } = req.params;
  const query = 'DELETE FROM salas WHERE idsala = $1 RETURNING *';
  const values = [idsala];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json({ message: 'Sala excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};