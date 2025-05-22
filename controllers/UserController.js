// controllers/TarefaController.js
const pool = require('../config/database');

// Criar um novo user
exports.criarUsers = async (req, res) => {
  const { nome, senha, email } = req.body;

  const query = 'INSERT INTO users (nome, senha, email) VALUES ($1, $2, $3) RETURNING *';
  const values = [nome, senha, email];

  try {
    const result = await pool.query(query, values);
    const users = result.rows[0];
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os users
exports.listarUsers = async (req, res) => {
  const query = 'SELECT * FROM user';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um user
exports.editarUsers = async (req, res) => {
  const { iduser } = req.params;
  const { nome, senha, email } = req.body;

  const query = `
    UPDATE users SET nome = $1, senha = $2, email = $3
    WHERE iduser = $4 RETURNING *`;
  const values = [nome, senha, email, iduser];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um user
exports.excluirUsers = async (req, res) => {
  const { iduser } = req.params;
  const query = 'DELETE FROM user WHERE iduser = $1 RETURNING *';
  const values = [iduser];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User não encontrado' });
    }
    res.status(200).json({ message: 'User excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};